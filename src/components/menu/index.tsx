// import { DownOutlined, SearchOutlined } from "@ant-design/icons";
// import { Dropdown, Input, Space } from "antd";
// import { ItemType } from "antd/es/menu/hooks/useItems";
// import { useEffect, useState } from "react";

// import "./index.scss";

// export default function MenuComponent(): JSX.Element {
//   const [dropdownOptions, setDropdownOptions] = useState<ItemType[]>([]);
//   const [screenWidth, setScreenWidth] = useState<number>(0);
//   const [canShowMore, setCanShowMore] = useState<boolean>(true);
//   const links = [
//     { href: "books", text: "0books", key: 0 },
//     { href: "home", text: "1home", key: 1 },
//     { href: "electronics", text: "2electronics", key: 2 },
//     { href: "books", text: "3books", key: 3 },
//     { href: "music", text: "4music", key: 4 },
//     { href: "movies", text: "5movies", key: 5 },
//     { href: "clothing", text: "6clothing", key: 6 },
//     { href: "games", text: "7games", key: 7 },
//     { href: "books", text: "8books", key: 8 },
//     { href: "books", text: "9books", key: 9 },
//     { href: "books", text: "10books", key: 10 },
//     { href: "books", text: "11books", key: 11 },
//     { href: "books", text: "12books", key: 12 },
//     { href: "books", text: "13books", key: 13 },
//     { href: "books", text: "14books", key: 14 },
//     { href: "books", text: "15books", key: 15 },
//     { href: "books", text: "16books", key: 16 },
//   ];

//   useState(() => {
//     function updateSize() {
//       // setScreenWidth(screen.width); // This willn't work as the screen width will update when browser is resized.
//       setScreenWidth(document.body.clientWidth);
//     }
//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   useEffect(() => {
//     getNavigationBar();
//     optimizeNavigation();
//   }, [screenWidth]);

//   function getNavigationBar(): JSX.Element[] {
//     return links.map((link) => (
//       <a href={link.href} key={link.key}>
//         {link.text}
//       </a>
//     ));
//   }

//   function optimizeNavigation(): void {
//     let navigationContainerWidth =
//       document.getElementById("nav-container")?.offsetWidth ?? 0;
//     const navigationLinks = document.getElementById("nav-items") ?? [];

//     if (
//       navigationLinks?.children.length === links.length &&
//       navigationContainerWidth < screenWidth
//     ) {
//       setCanShowMore(false);
//       return;
//     }

//     if (navigationContainerWidth < screenWidth) {
//       let option = dropdownOptions[dropdownOptions.length - 1];

//       if (!option) return;

//       const linkChild = document.createElement("a");
//       linkChild.innerHTML = option.label.props.children;
//       linkChild.href = option.label.props.href;
//       navigationLinks?.appendChild(linkChild);
//       option = dropdownOptions.pop();

//       navigationContainerWidth =
//         document.getElementById("nav-container")?.offsetWidth;
//     }

//     while (
//       navigationContainerWidth > screenWidth &&
//       navigationLinks?.children.length !== 0
//     ) {
//       const lastChild = navigationLinks.removeChild(navigationLinks.lastChild);
//       addItem({
//         key: self.crypto.randomUUID(),
//         label: (
//           <a href={lastChild.getAttribute("href")}>{lastChild.textContent}</a>
//         ),
//       });
//       navigationContainerWidth =
//         document.getElementById("nav-container")?.offsetWidth;

//       setScreenWidth(screen.width);
//       setCanShowMore(true);
//     }
//   }

//   function addItem(option: ItemType) {
//     dropdownOptions.push(option);
//     setDropdownOptions([...dropdownOptions]);
//   }

//   return (
//     <div className="container">
//       <nav className="navbar" id="nav-container">
//         <div className="logo">Logo</div>
//         <div id="nav-items" className="flex">
//           {getNavigationBar()}
//         </div>
//         {canShowMore && (
//           <Dropdown menu={{ items: dropdownOptions }}>
//             <a onClick={(e) => e.preventDefault()}>
//               <Space>
//                 more
//                 <DownOutlined />
//               </Space>
//             </a>
//           </Dropdown>
//         )}
//         <Input
//           placeholder="Search something"
//           prefix={<SearchOutlined />}
//           className="search"
//           bordered={false}
//         />
//       </nav>
//     </div>
//   );
// }

import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, Space } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useRef, useState } from "react";

import "./index.scss";

export default function MenuComponent(): JSX.Element {
  const [dropdownOptions, setDropdownOptions] = useState<ItemType[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const navigationItems = useRef(null);
  const navigationContainer = useRef(null);
  const [aLinks, setaLinks] = useState([]);
  const [moreLink, setmoreLink] = useState([]);

  const links = [
    { href: "lifestyle", text: "lifestyle", key: 0 },
    { href: "home", text: "home", key: 1 },
    { href: "electronics", text: "electronics", key: 2 },
    { href: "books", text: "books", key: 3 },
    { href: "music", text: "music", key: 4 },
    { href: "movies", text: "movies", key: 5 },
    { href: "clothing", text: "clothing", key: 6 },
    { href: "games", text: "games", key: 7 },
    { href: "jewelry", text: "jewelry", key: 8 },
    { href: "furniture", text: "Furniture", key: 9 },
    { href: "games", text: "games", key: 10 },
    { href: "toys", text: "toys", key: 11 },
    { href: "stationery", text: "stationery", key: 12 },
    { href: "sports", text: "sports", key: 13 },
    { href: "hobbies", text: "hobbies", key: 14 },
    { href: "health", text: "health", key: 15 },
    { href: "pets", text: "pets", key: 16 },
  ];

  useState(() => {
    function updateSize() {
      setScreenWidth(document.body.clientWidth);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    getNavigationBar();
  }, [screenWidth]);

  function getNavigationBar(): JSX.Element[] {
    if (!navigationItems.current || !navigationContainer.current) return;

    const childrenCount = navigationItems.current?.children.length;
    for (let index = 0; index < childrenCount; index++) {
      navigationItems.current.removeChild(navigationItems.current.lastChild);
    }

    const tempDor = [];
    for (let index = 0; index < links.length; index++) {
      const link = links[index];
      if (navigationContainer.current?.clientWidth < screenWidth) {
        const linkChild = document.createElement("a");
        linkChild.innerHTML = link.text;
        linkChild.href = link.href;
        navigationItems.current?.appendChild(linkChild);
      } else {
        tempDor.push({
          key: link.key,
          label: <a href={link.href} className="link">{link.text}</a>,
        });
      }
    }

    while (navigationContainer.current?.clientWidth >= screenWidth) {
      const lastChild = navigationItems.current.removeChild(
        navigationItems.current.lastChild
        );

      tempDor.unshift({
        key: self.crypto.randomUUID(),
        label: <a href={lastChild.href} className="link">{lastChild.text}</a>,
      });
    }

    setDropdownOptions([...tempDor]);
  }

  return (
    <div className="container">
      <nav className="navbar" id="nav-container" ref={navigationContainer}>
        <div className="logo">Logo</div>
        <div id="nav-items" className="flex" ref={navigationItems}></div>
        {dropdownOptions.length > 0 && (
          <Dropdown menu={{ items: dropdownOptions }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                more
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        )}
        <Input
          placeholder="Search something"
          prefix={<SearchOutlined />}
          className="input-search"
          bordered={false}
        />
      </nav>
    </div>
  );
}
