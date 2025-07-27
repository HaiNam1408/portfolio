import React, { useEffect, useRef } from "react";

interface SquaresProps {
  speed?: number;
  squareSize?: number;
  direction?: "up" | "down" | "left" | "right" | "diagonal";
  borderColor?: string;
  fillColor?: string;
}

const Squares: React.FC<SquaresProps> = ({
  speed = 0.5,
  squareSize = 40,
  direction = "diagonal",
  borderColor = "#fff",
  fillColor = "#000",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let squares: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      dx: number;
      dy: number;
    }> = [];

    const getDirection = () => {
      switch (direction) {
        case "up":
          return { dx: 0, dy: -1 };
        case "down":
          return { dx: 0, dy: 1 };
        case "left":
          return { dx: -1, dy: 0 };
        case "right":
          return { dx: 1, dy: 0 };
        case "diagonal":
        default:
          return { dx: 1, dy: 1 };
      }
    };

    const { dx, dy } = getDirection();

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initSquares = () => {
      squares = [];
      const cols = Math.ceil(canvas.width / squareSize) + 1;
      const rows = Math.ceil(canvas.height / squareSize) + 1;

      for (let i = -2; i < cols; i++) {
        for (let j = -2; j < rows; j++) {
          squares.push({
            x: i * squareSize,
            y: j * squareSize,
            size: squareSize,
            speed: speed,
            dx,
            dy,
          });
        }
      }
    };

    const resizeHandler = () => {
      setCanvasSize();
      initSquares();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      squares.forEach((square) => {
        square.x += square.speed * square.dx;
        square.y += square.speed * square.dy;

        if (square.x > canvas.width + square.size) square.x = -square.size * 2;
        if (square.x < -square.size * 2) square.x = canvas.width + square.size;
        if (square.y > canvas.height + square.size) square.y = -square.size * 2;
        if (square.y < -square.size * 2) square.y = canvas.height + square.size;

        ctx.strokeStyle = borderColor;
        ctx.fillStyle = fillColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(
          Math.floor(square.x),
          Math.floor(square.y),
          square.size,
          square.size
        );
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Init
    setCanvasSize();
    initSquares();
    animate();

    // Listen to resize
    window.addEventListener("resize", resizeHandler);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeHandler);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [speed, squareSize, direction, borderColor, fillColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ backgroundColor: fillColor }}
    />
  );
};

export default Squares;
