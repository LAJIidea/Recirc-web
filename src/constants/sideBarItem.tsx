import DashboardIcon from "../assets/icons/fill/Dashboard";
import WalletIcon from "../assets/icons/fill/Wallet";
import CommentIcon from "../assets/icons/fill/Comment";
import MessageIcon from "../assets/icons/fill/Message";
import ChartIcon from "../assets/icons/fill/Chart";
import CreditIcon from "../assets/icons/fill/Credit";
import DocumentIcon from "../assets/icons/fill/Document";
import CodeIcon from "../assets/icons/fill/Code";

export default function sideBarItem(pathname: string) {
  return [
    { title: "Dashboard", Icon: <DashboardIcon isActive={pathname === "/"} />, href: "/" },
    { title: "Wallet", Icon: <WalletIcon isActive={pathname === "/wallet"} />, href: "/wallet" },
    { title: "Discord", Icon: <CommentIcon isActive={pathname === "/discord"} />, href: "/discord" },
    { title: "Messages", Icon: <MessageIcon isActive={pathname === "/messages"} />, href: "/messages" },
    { title: "Statistics", Icon: <ChartIcon isActive={pathname === "/statistics"} />, href: "/statistics" },
    { title: "Payments", Icon: <CreditIcon isActive={pathname === "/payments"} />, href: "/payments" },
    { title: "Documents", Icon: <DocumentIcon isActive={pathname === "/document"} />, href: "/document"},
    { title: "Code", Icon: <CodeIcon isActive={pathname === '/code'} />, href: "/code" }
  ];
}
