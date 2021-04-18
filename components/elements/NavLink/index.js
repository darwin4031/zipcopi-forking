import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Children, cloneElement } from "react";

const NavLink = ({
  href,
  as,
  exact,
  className: additionalClass,
  inactiveClassName,
  activeClassName,
  children,
  ...props
}) => {
  const { asPath } = useRouter();

  // Normalize and split paths into their segments
  const segment = (p) => {
    const isBrowser = typeof window !== "undefined";
    const origin = isBrowser ? location.origin : process.env.HOST_ORIGIN;
    return new URL(p, origin).pathname.split("/").filter((s) => s);
  };

  const currentPath = segment(asPath);
  const targetPath = segment(as || href);

  // The route is active if all of the following are true:
  //    1. There are at least as many segments in the current route as in the destination route
  //    2. The current route matches the destination route
  //    3. If we're in “exact" mode, there are no extra path segments at the end
  const isActive =
    currentPath.length >= targetPath.length &&
    targetPath.every((p, i) => currentPath[i] === p) &&
    (!exact || targetPath.length === currentPath.length);

  const child = Children.only(children);
  const className = clsx(
    child.props.className,
    additionalClass,
    isActive && activeClassName,
    !isActive && inactiveClassName
  );

  return (
    <Link href={href} as={as} {...props}>
      {cloneElement(children, { className })}
    </Link>
  );
};

export default NavLink;
