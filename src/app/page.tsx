"use client";

import React, { useState, useEffect } from 'react';
import { genCircomAllstr } from '../lib/gen_circom';
import { applyMinDfa, regexToDfa } from '../lib/regex';
// import compiler from '@zk-email/zk-regex-compiler';

const PageComponent: React.FC = () => {
    const [regex, setRegex] = useState<string>("a=(b|c)+ d=e");
    const [inputs, setInputs] = useState<string[]>(["a=bccccccccc d=e", "", ""]);
    const [minDfa, setMinDfa] = useState<any[]>([]);
    const [reveals, setReveals] = useState<string[][]>([[]]);
    const [parsedInputs, setParsedInputs] = useState<any[]>([]);
    const [circom, setCircom] = useState<string>("");
    const [currentReveal, setCurrentReveal] = useState<number>(0);

    const validateRegex = (regex: string | RegExp) => {
        try {
            new RegExp(regex);
            // console.log("Testing ", compiler);
            return true;
        } catch (e) {
            return false;
        }
    };

    const validateInput = (input: string, regex: string | RegExp) => {
        if (!validateRegex(regex)) {
            return false;
        }
        const regexObj = new RegExp(regex);
        return !input || regexObj.test(input);
    };

    const test = () => {
        if (!validateRegex(regex)) {
            return;
        }
        if (inputs.some(input => !validateInput(input, regex))) {
            return;
        }
        const dfa = regexToDfa(regex);
        setMinDfa(dfa);
        let results = [];
        let replacedInputs = inputs.map(s => s.replaceAll("\n", "\r\n"));
        for (let input of replacedInputs) {
            if (input === "") {
                results.push([]);
                continue;
            }
            let result = applyMinDfa(dfa, input);
            results.push(result.length > 0 ? result : []);
        }
        setParsedInputs(results);
    };

    const displayChar = (c: string) => {
        if (c === "\r") {
            return "\\r";
        }
        if (c === "\n") {
            return "\\n";
        }
        return c;
    };

    const generate = () => {
        let r = reveals.map(r1 => r1.map(r2 => r2.split(",")));
        const circomStr = genCircomAllstr(minDfa, "Test", r, regex);
        setCircom(circomStr);
    };

    const selectRevealState = (state: string[]) => {
        const reveal = [...reveals[currentReveal]];
        const transition = state[0] + "," + state[1];
        const index = reveal.indexOf(transition);
        if (index !== -1) {
            reveal.splice(index, 1);
        } else {
            reveal.push(transition);
        }
        // Update the reveals array
        const newReveals = [...reveals];
        newReveals[currentReveal] = reveal;
        setReveals(newReveals);
    };

    const removeReveal = (i: number) => {
        const newReveals = reveals.length === 1 ? [[]] : reveals.filter((_, index) => index !== i);
        setReveals(newReveals);
        setCurrentReveal(newReveals.length - 1);
    };

    const stateSelected = (state: string[], reveals: string[][], currentReveal: number) => {
        const reveal = reveals[currentReveal];
        return reveal.includes(state[0] + "," + state[1]);
    };

    const newReveal = () => {
        setReveals([...reveals, []]);
        setCurrentReveal(reveals.length);
    };

    return (
          <div className="h-auto w-full text-primary-content mb-16 mt-32 text-white">
            <div className="h-auto overflow-y-scroll w-full flex items-center justify-center">
                <div className="w-5/6">
                <form className="w-full">
                    <div className="form-control w-full mb-4">
                        <label htmlFor="regex" className="label" id="regexpattern">
                        <span className="label-text">Regex Pattern</span>
                        </label>
                        <input
                        id="regex"
                        type="text"
                        className={`bg-transparent border border-gray-500 focus:border-gray-300 rounded-md py-2 px-4 focus:outline-none w-full ${!validateRegex(regex) ? 'input-error' : ''}`}
                        value={regex}
                        placeholder="(h|H)ello (w|W)orld"
                        onChange={(e) => setRegex(e.target.value)}
                        />
                    </div>
                    {Array.from({ length: 3 }, (_, index) => (
                        <div className="form-control w-full mb-4" key={index}>
                        <label htmlFor={`input${index + 1}`} className="label">
                            <span className="label-text">Input {index + 1}</span>
                        </label>
                        <textarea
                            id={`input${index + 1}`}
                            className={`bg-transparent border border-gray-500 focus:border-gray-300 rounded-md py-2 px-4 focus:outline-none w-full ${!validateInput(inputs[index], regex) ? 'input-error' : ''}`}
                            value={inputs[index]}
                            placeholder=""
                            onChange={(e) => {
                                const newInputs = [...inputs];
                                newInputs[index] = e.target.value;
                                setInputs(newInputs);
                            }}
                        />
                        </div>
                    ))}
                    <button className="btn mt-2 w-full bg-gray-600 rounded-md py-2 px-4" onClick={(e) => { e.preventDefault(); test(); }}>Continue</button>
                    </form>
                    {parsedInputs.length > 0 && (
                        <div className="text-left w-full mt-4">
                        Click the states below to select the characters you want to reveal or export.
                        <br />
                        <br />
                        {parsedInputs.map((parsedInput, i) => (
                            parsedInput.length > 0 && (
                            <div key={i}>
                                <div className="text-lg mb-2">
                                Input {i + 1}: {parsedInput.length > 0 ? "Accepted" : "Rejected"}
                                </div>
                                {parsedInput.map((states: any[], index: React.Key | null | undefined) => (
                                <div key={index}>
                                    <table className="table text-center w-full">
                                    <thead>
                                        <tr className="border-b-stone-300">
                                        {states.map((state, stateIndex) => (
                                            <th key={stateIndex} className="p-0 w-5 cursor-pointer" onClick={() => selectRevealState(state)}>
                                            {state[1]}
                                            </th>
                                        ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b-stone-300">
                                        {states.map((state, stateIndex) => (
                                            <td key={stateIndex} className={`p-0 w-5 cursor-pointer ${stateSelected(state, reveals, currentReveal) ? 'bg-yellow-50' : ''}`} onClick={() => selectRevealState(state)}>
                                            {displayChar(state[2])}
                                            </td>
                                        ))}
                                        </tr>
                                    </tbody>
                                    </table>
                                    <br />
                                </div>
                                ))}
                            </div>
                            )
                        ))}
                        <div className="mt-10 w-full">
                            <div className="text-xl">
                            Selected Reveal Groups
                            </div>
                            <div className="flex flex-col">
                            {reveals.map((reveal, i) => (
                                <div key={i} className="flex flex-row items-center">
                                <button className="btn btn-sm btn-circle btn-ghost text-red-500" onClick={() => removeReveal(i)}>✕</button>
                                <div className="mr-4 cursor-pointer" onClick={() => setCurrentReveal(i)} style={{ fontWeight: currentReveal === i ? 'bold' : 'normal' }}>
                                    Reveal #{i}
                                </div>
                                <div>{JSON.stringify(reveal)}</div>
                                </div>
                            ))}
                            <button className="btn mt-4 w-1/3" onClick={newReveal}>+ Add New Reveal Group</button>
                            </div>
                        </div>
                        <button className="btn mt-4 w-full" onClick={generate}>Generate</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
  );
};

export default PageComponent;
