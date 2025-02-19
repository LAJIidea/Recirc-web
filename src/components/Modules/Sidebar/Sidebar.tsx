import SigninIcon from "../../../assets/icons/fill/Signin";
import MainTooltip from "../Tooltip/MainTooltip";
import LogoIcon from "../../../assets/icons/logo/Logo";
import sideBarItem from "../../../constants/sideBarItem";
import { useEffect } from "react";
import CloseIcon from "../../../assets/icons/fill/Close";
import { Link, useLocation } from "@tanstack/react-router";
import { useSidebarStore } from "../../../stores/useSidebar";
import ExpandRightIcon from "../../../assets/icons/fill/ExpandRight";
import { useRevokeUser } from "../../../hooks/useRevokeUser";

export default function Sidebar() {
  const {
    isSidebarOpen,
    toggleSidebar,
    isSidebarExpanded,
    expandSidebarToggle,
  } = useSidebarStore();

  const { pathname } = useLocation();

  const { revokeUser } = useRevokeUser();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isSidebarOpen) {
        toggleSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={() => toggleSidebar(false)}
          className="fixed md:hidden inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm z-40"
        ></div>
      )}
      <div
        className={`bg-black px-5 py-4 h-[93.5dvh] transition-all duration-[250ms] rounded-[40px] ${
          isSidebarExpanded ? "w-64" : "w-[70px]"
        } absolute md:static z-50 ${
          isSidebarOpen ? "left-5 !w-max sm:w-[40%]" : ""
        } ${!isSidebarOpen ? "-left-96" : ""}`}
      >
        <div
          className={`flex flex-col ${
            isSidebarExpanded || isSidebarOpen ? "items-start" : "items-center"
          } justify-between h-full relative`}
        >
          <MainTooltip content="Expand">
            <span
              className={`hidden md:inline-block absolute -right-8 top-[50px] cursor-pointer transition-all duration-250 ${
                isSidebarExpanded ? "rotate-180" : "rotate-0"
              }`}
              onClick={expandSidebarToggle}
            >
              <ExpandRightIcon />
            </span>
          </MainTooltip>
          <div>
            <div className="flex items-center gap-4 sm:gap-3 flex-wrap-reverse mt-2">
              <LogoIcon />
              <h1 className="font-poppinsRegular text-2xl sm:text-3xl md:hidden text-white">
                Overview
              </h1>
              <span
                className="cursor-pointer md:hidden"
                onClick={() => toggleSidebar(false)}
              >
                <CloseIcon />
              </span>
            </div>
            <ul className="flex flex-col gap-4 mt-16">
              {sideBarItem(pathname).map((item, index) => (
                <li
                  key={index}
                  className="child-hover:text-primaryGreen child:text-white child:transition-all"
                >
                  <Link to={item.href} className="flex items-center gap-2">
                    <MainTooltip key={index} content={item.title}>
                      <span className="cursor-pointer">{item.Icon}</span>
                    </MainTooltip>
                    <span
                      className={`font-poppinsRegular ${
                        !isSidebarExpanded && "md:hidden"
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={`flex items-center  mt-4 gap-2`} onClick={revokeUser}>
            <MainTooltip content="Signout">
              <span className="cursor-pointer">
                <SigninIcon />
              </span>
            </MainTooltip>

            <span
              className={`text-white font-poppinsRegular transition-all hover:text-danger-600 ${
                !isSidebarExpanded && "md:hidden"
              }`}
            >
              Signout
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
