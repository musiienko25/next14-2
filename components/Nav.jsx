"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        Nav
        <Image
          src="/assets/images/logo.svg"
          alt="Promtopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create post
            </Link>
            <button
              type="button"
              onClick={() => {
                setToggleDropdown(false);
                signOut();
              }}
              className="mt-5 w-full black_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider, id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative"></div>
    </nav>
  );
};

export default Nav;
