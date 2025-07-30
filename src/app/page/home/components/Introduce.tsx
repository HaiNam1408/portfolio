import { Hand } from "lucide-react";
import { TiltedCard } from "../../../components/ui";
import AppButton from "../../../components/ui/AppButton";
import { useTranslation } from "react-i18next";

function Introduce() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 min-h-[80vh] w-full mt-8 px-4">
      {/* Avatar Section */}
      <div className="w-full md:w-1/3 flex justify-center md:justify-start">
        <TiltedCard
          imageSrc="src/assets/avatar.jpg"
          altText="Phạm Hải Nam - Developer"
          captionText="Phạm Hải Nam - Developer"
          rotateAmplitude={12}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
        />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-2/3 flex flex-col text-left">
        <div className="flex items-center gap-2">
          <Hand className="text-primary animate-[wave_3s_infinite]" size={24} />
          <p className="text-xl font-bold">
            {t("common.intro.hello")}{" "}
            <span className="text-primary">Phạm Hải Nam</span>,
          </p>
        </div>

        <p className="text-3xl sm:text-4xl lg:text-6xl font-bold mt-4 leading-tight">
          {t("common.intro.a")}{" "}
          <span className="text-primary">{t("common.intro.creative")}</span> &{" "}
          <span className="text-primary">{t("common.intro.passionate")}</span>
          <br />
          {t("common.intro.fullstack")}
        </p>

        <p className="text-base sm:text-lg mt-4">
          {t("common.intro.introduce")}
        </p>

        <div className="mt-8 self-center md:self-start">
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
