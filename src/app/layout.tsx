"use client";

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';
import { ReactNode } from 'react';
// import compiler from '../../../zk-regex/packages/compiler';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // console.log("Test", compiler.genRegexFromStr("a+"));
  return (
  <div className="h-full bg-gray-800">
    <div className="w-full text-center text-primary-content pt-5 md:hidden bg-gray-900 pl-8 pr-8">
			<h1 className="text-4xl font-extrabold">Visual Circuit Generator</h1>
			<p className="text-left">
			</p>
		</div>
    <div className="w-full flex h-full">
      <div className="w-5/12 hidden md:flex bg-gray-900 flex-wrap">
        <div className="px-8 text-left text-white">
          <div className="flex mt-8 flex-wrap">
              <Link href="https://zkregex.com" className="flex justify-center items-center hover:underline">
                  <Image src="circle-nodes-solid.svg" alt="Circle Nodes" width={50} height={50} />
                  <h2 className="text-3xl font-bold">ZK Regex</h2>
              </Link>
          </div>
          <h1 className="text-4xl font-extrabold mt-16">Visual Circuit Generator</h1>
          <p>
						Generate Circom & Halo2 (WIP) circuits for regular expressions.
					</p>
          <div className='collapse-open'> 
            <h2 className="collapse-title text-2xl font-bold pl-0 pr-0" >Step 1: Input regex and some example strings</h2>
            <pre className="collapse-content">
              <span>- Linebreaks use:</span><code>/r/n</code>
              <span>- View supported syntax </span><a href="https://zkregex.com/min_dfa" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">here</a>
            </pre>
          </div>
          <div className='collapse-open'> 
            <h2 className="collapse-title text-2xl font-bold pl-0 pr-0">Step 2: Select which states to be revealed</h2>
            <pre className="collapse-content">
              <span>- Add to each 'Reveal' array by selecting states to reveal</span>
            </pre>
          </div>
          <div className='collapse-open'> 
            <h2 className="collapse-title text-2xl font-bold pl-0 pr-0">Step 3: Generate and test the generated code</h2>
            <div className="collapse-content">
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-8/12">
        {children}
      </div>
    </div>
  </div>
  );
};

export default Layout;