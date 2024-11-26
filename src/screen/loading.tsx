import Logo from "../assets/images/logo.png";
import LogoSecond from "../assets/images/logo-second.png";

export default function Loading({
  logoLarge = false,
}: {
  logoLarge?: boolean;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      {logoLarge ? (
        <img src={Logo} alt="logo" className="h-12" />
      ) : (
        <img src={LogoSecond} alt="logo" className="h-12" />
      )}
    </div>
  );
}
