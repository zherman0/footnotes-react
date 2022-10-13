import React from "react";
import {
  Alert,
  Brand,
  Button,
  ButtonVariant,
  Dropdown,
  // DropdownToggle,
  DropdownItem,
  KebabToggle,
  Nav,
  NavItem,
  NavList,
  Page,
  PageHeader,
  PageHeaderTools,
  PageHeaderToolsItem,
  PageHeaderToolsGroup,
  PageSidebar,
  SkipToContent,
} from "@patternfly/react-core";
import { Link } from "react-router-dom";
import "./App.css";
import accessibleStyles from "@patternfly/react-styles/css/utilities/Accessibility/accessibility";
import { css } from "@patternfly/react-styles";
import { BellIcon, CogIcon, UserIcon } from "@patternfly/react-icons";
import imgBrand from "./img/footnotes-white.png";
import "@patternfly/react-core/dist/styles/base.css";
// import { getStoredProp, saveLocalProp } from "./components/localStorage.js";

export const NavPage: React.FC<NavPageProps> = (props) => {
  // const storedUser = getStoredProp("storedUser");
  // const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("/");
  // const [user, setUser] = React.useState(storedUser || "");
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);
  const [mobileView, setMobileView] = React.useState(false);

  React.useEffect(() => {
    const url = window.location.pathname;
    const page = url.substring(url.lastIndexOf("/") + 1);
    setActiveItem(`/${page}`);
  }, []);

  // const onDropdownToggle = (_isDropdownOpen: boolean) =>
  //   setIsDropdownOpen(_isDropdownOpen);
  // const onDropdownSelect = (event: any) => setIsDropdownOpen(!isDropdownOpen);
  const onKebabDropdownToggle = (_isKebabDropdownOpen: boolean) =>
    setIsKebabDropdownOpen(_isKebabDropdownOpen);
  const onKebabDropdownSelect = (event: any) => {
    setIsKebabDropdownOpen(!isKebabDropdownOpen);
  };
  const onNavSelect = (result: any) => {
    setActiveItem(result.itemId);
  };
  const handleLoginToggle = () => setIsLoginOpen(!isLoginOpen);
  // const setUsername = (user: string) => {
  //   setUser(user);
  //   saveLocalProp("storedUser", user);
  //   setIsLoginOpen(false);
  // };

  const handleResize = (obj: any) => {
    setMobileView(obj.windowSize < 1200);
  };
  //todo: isActive will not work for LINK
  const PageNav = (
    <Nav
      onSelect={onNavSelect}
      aria-label="Nav"
      variant={mobileView ? "default" : "horizontal"}
    >
      <NavList>
        <NavItem itemId={0} isActive={activeItem === "0"}>
          <Link to="./locations">Locations</Link>
        </NavItem>
        <NavItem itemId={1} isActive={activeItem === "1"}>
          <Link to="./users">Users</Link>
        </NavItem>
        <NavItem itemId={2} isActive={activeItem === "2"}>
          <Link to="./hikes">Hikes</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
  const kebabDropdownItems = [
    <DropdownItem key="login-kebab">
      <UserIcon />
      <span onClick={handleLoginToggle}> Login</span>
    </DropdownItem>,
    <DropdownItem name="about-kebab" key="about-kebab">
      <CogIcon />
      <span onClick={() => setIsAboutOpen(!isAboutOpen)}> About</span>
    </DropdownItem>,
  ];

  // const signout = () => {
  //   setUser("");
  //   saveLocalProp("storedUser", "");
  // };

  // const userDropdownItems = [
  //   <DropdownItem
  //     key="profile"
  //     component={
  //       <Link to={`${process.env.REACT_APP_SKI2020}/profile`}>Profile</Link>
  //     }
  //   >
  //     Profile
  //   </DropdownItem>,
  //   // <DropdownItem key="sign-out" component="button" onClick={signout}>
  //   //   Sign Out
  //   // </DropdownItem>,
  // ];

  const PageToolbar = (
    <PageHeaderTools>
      <PageHeaderToolsGroup
        visibility={{
          default: "hidden",
          lg: "visible",
        }}
      >
        <PageHeaderToolsItem>
          <Button
            id="horizontal-example-uid-01"
            aria-label="Notifications actions"
            variant={ButtonVariant.plain}
            // onClick={() => alert("oh no")}
            onClick={() => (
              <Alert variant="info" timeout={true} title="Ski Time">
                Ski Season is OPEN!
              </Alert>
            )}
          >
            <BellIcon />
          </Button>
        </PageHeaderToolsItem>
      </PageHeaderToolsGroup>
      <PageHeaderToolsGroup>
        <PageHeaderToolsItem
          visibility={{
            lg: "hidden",
          }} /** this kebab dropdown replaces the icon buttons and is hidden for desktop sizes */
        >
          <Dropdown
            key="kebab-menu"
            isPlain
            position="right"
            onSelect={onKebabDropdownSelect}
            toggle={<KebabToggle onToggle={onKebabDropdownToggle} />}
            isOpen={isKebabDropdownOpen}
            dropdownItems={kebabDropdownItems}
          />
        </PageHeaderToolsItem>
        <PageHeaderToolsItem
          className={css(
            accessibleStyles.screenReader,
            accessibleStyles.visibleOnLg
          )}
        >
          {/* {user && (
            <Dropdown
              key="user-menu"
              isPlain
              position="right"
              onSelect={onDropdownSelect}
              isOpen={isDropdownOpen}
              toggle={
                <DropdownToggle onToggle={onDropdownToggle}>
                  {user}
                </DropdownToggle>
              }
              dropdownItems={userDropdownItems}
            />
          )}
          {!user && (
            <Button
              id="horizontal-example-uid-02"
              aria-label="Settings actions"
              variant={ButtonVariant.plain}
              onClick={handleLoginToggle}
            >
              Login
            </Button>
          )} */}
        </PageHeaderToolsItem>
      </PageHeaderToolsGroup>
    </PageHeaderTools>
  );

  const logoProps = {
    href: process.env.REACT_APP_BASE_URL,
  };
  const Header = (
    <PageHeader
      logo={<Brand src={imgBrand} alt="Lucky13s Logo" />}
      logoProps={logoProps}
      headerTools={PageToolbar}
      // avatar={<Avatar src={imgAvatar} alt="Avatar image" />}
      topNav={PageNav}
      showNavToggle={mobileView}
    />
  );
  const Sidebar = <PageSidebar nav={PageNav} />;
  const pageId = "main-content-page-layout-horizontal-nav";
  const PageSkipToContent = (
    <SkipToContent href={`#${pageId}`}>Skip to content</SkipToContent>
  );
  const { children } = props;
  return (
    <>
      <Page
        header={Header}
        sidebar={mobileView ? Sidebar : null}
        skipToContent={PageSkipToContent}
        mainContainerId={pageId}
        isManagedSidebar
        defaultManagedSidebarIsOpen={false}
        onPageResize={handleResize}
      ></Page>
      {children}
    </>
  );
};
export type NavPageProps = {
  intialPlace?: string;
  children?: React.ReactElement[];
};
