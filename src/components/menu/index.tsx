import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, Space } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useRef, useState } from "react";

import "./index.scss";

export default function MenuComponent(): JSX.Element {
  const [dropdownOptions, setDropdownOptions] = useState<ItemType[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const navigationItems = useRef<HTMLDivElement>(null);
  const navigationContainer = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
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

  function getNavigationBar(): void {
    if (!navigationItems.current || !navigationContainer.current) return;

    const childrenCount = navigationItems.current?.children.length;
    for (let index = 0; index < childrenCount; index++) {
      navigationItems.current.lastChild &&
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
          label: (
            <a href={link.href} className="link">
              {link.text}
            </a>
          ),
        });
      }
    }

    while (navigationContainer.current?.clientWidth >= screenWidth) {
      if (!navigationItems.current.lastChild) return;

      // @ts-ignore
      const lastChild: HTMLAnchorElement & ChildNode =
        navigationItems.current.removeChild(navigationItems.current.lastChild);

      tempDor.unshift({
        key: self.crypto.randomUUID(),
        label: (
          <a href={lastChild.href} className="link">
            {lastChild.text}
          </a>
        ),
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
