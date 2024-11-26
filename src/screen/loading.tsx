import Logo from "../assets/images/logo.png";
import LogoSecond from "../assets/images/logo-second.png";

export default function Loading({
  logoLarge = false,
}: {
  logoLarge?: boolean;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {logoLarge ? (
        <img src={Logo} alt="logo" className="h-12" />
      ) : (
        <img src={LogoSecond} alt="logo" className="h-12" />
      )}
    </div>
  );
}
