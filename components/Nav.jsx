"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [toggleDropDown, setToggleDropDown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          height={30}
          width={30}
          alt="Promptopia-Logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Signout
            </button>
            <Link href={"/profile"}>
              <Image
                src={session.user.image}
                width={37}
                height={37}
                alt="Profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <button
            className="black_btn"
            type="button"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image}
              height={37}
              width={37}
              className="rounded-full cursor-pointer"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />

            {toggleDropDown && (
              <div className="dropdown cursor-pointer">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  className="black_btn mt-5 w-full"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  SignOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="black_btn"
            type="button"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
