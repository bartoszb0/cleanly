import { Input } from "@/components/ui/input";
import { OnboardingWrapper } from "../components/onboarding-wrapper";

export default function CleanerForm() {
  return (
    <OnboardingWrapper
      description="Fill out your information to set up your profile"
      variant="cleaner"
    >
      <form className="onboarding-form">
        <fieldset>
          <Input />
        </fieldset>
      </form>
    </OnboardingWrapper>
  );
}
