import { Hand } from "lucide-react";
import { TiltedCard } from "../../../components/ui";
import AppButton from "../../../components/ui/AppButton";
import { useTranslation } from "react-i18next";

function Introduce() {
  const {t} = useTranslation();
  return (
    <div className="flex min-h-[80vh] w-full mt-8">
      <div className="w-1/3">
        <TiltedCard
          imageSrc="src\assets\avatar.jpg"
          altText="Phạm Hải Nam - Developer"
          captionText="Phạm Hải Nam - Developer"
          rotateAmplitude={12}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
        />
      </div>
      <div className="flex flex-col text-left align-start justify-start w-2/3">
        <div className="flex items-center gap-2">
          <Hand
            className="text-amber-200 animate-[wave_3s_infinite]"
            size={24}
          />
          <p className="text-xl font-bold">
            {t("common.intro.hello")}{" "}
            <span className="text-amber-200">Phạm Hải Nam</span>,
          </p>
        </div>
        <p className="text-6xl font-bold mt-4">
          {t("common.intro.a")}{" "}
          <span className="text-amber-200">{t("common.intro.creative")}</span>{" "}
          &{" "}
          <span className="text-amber-200">{t("common.intro.passionate")}</span>
          <br /> {t("common.intro.fullstack")}
        </p>
        <p className="text-lg mt-4">{t("common.intro.introduce")}</p>
        <div className="mt-8">
          <AppButton
            title={t("common.intro.resume")}
            subtitle={t("common.intro.download")}
          />
        </div>
      </div>
    </div>
  );
}

export default Introduce;
