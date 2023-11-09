<script lang="js">
	import { genCircomAllstr } from "$lib/gen_circom";
	import { applyMinDfa, getStateTransitions, regexToDfa } from "$lib/regex.js";
	import { stringify } from "postcss";

    let regex = "a=(b|c)+ d=e";
    let inputs = ["a=bccccccccc d=e","",""];
    let minDfa = [];
    let reveals = [["0,1"]];

    let parsedInputs = [];

    function validateRegex(regex) {
        return !!regex
    };
    function test() {
        minDfa = regexToDfa(regex);
        let results = []
        for (let input of inputs) {
            if (input == "") {
                results.push([]);
                continue;
            }
            let result = applyMinDfa(minDfa, input);
            if (result.length > 0) {
                results.push(result);
            } else {
                results.push([]);
            }
        }
        parsedInputs = results;
    }

    function generate() {
        let r = reveals.map(r1 => r1.map(r2 => r2.split(",")));
        console.log(r);
        let circom = genCircomAllstr(minDfa, "Test", r);
        console.log(circom);
    }

    $: console.log('Changed selected:', reveals);
</script>

<div class="h-screen w-full ">
    <div class="h-full overflow-y-scroll w-full flex items-center justify-center">
        <div class="w-5/6">
    <form class="w-full">
        <label for="regex" class="label">
            <span class="label-text">Regex Pattern</span>
        </label>
        <div class="form-control w-full mb-4">
            <input id="regex" type="text" class:input-error={!validateRegex()} bind:value={regex} placeholder="(h|H)ello (w|W)orld" class="input input-bordered w-full" />
        </div>
        <label for="input1" class="label">
            <span class="label-text">Input 1</span>
        </label>
        <div class="form-control w-full mb-4">
            <input id="input1" type="text" bind:value={inputs[0]} placeholder="Hello World" class="input input-bordered w-full" />
        </div>
        <label for="input2" class="label">
            <span class="label-text">Input 2</span>
        </label>
        <div class="form-control w-full mb-4">
            <input id="input2" type="text" bind:value={inputs[1]} placeholder="hello world" class="input input-bordered w-full" />
        </div>
        <label for="input3" class="label">
            <span class="label-text">Input 3</span>
        </label>
        <div class="form-control w-full mb-4">
            <input id="input3" type="text" bind:value={inputs[2]} placeholder="" class="input input-bordered w-full" />
        </div>
        <button class="btn mt-4" on:click={test}>Test</button>
    </form>
    {#if parsedInputs.length > 0}
    <div class="text-left w-full">
        {#each parsedInputs as parsedInput, i}
            {#if parsedInput.length > 0 || inputs[i] !== ""}
            <div class="text-lg">
                Input {i+1}: {parsedInput.length > 0 ? "Accepted" : "Rejected"} 
            </div>
            {#each parsedInput as states}
            <table class="table text-center w-full">
                <!-- head -->
                <thead>
                    <tr class="border-b-stone-300">
                        {#each states as state}
                            <th class="p-0 w-5">{state[0]}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                        <tr class="border-b-stone-300">
                    {#each states as state}
                        <td class="p-0 w-5">{state[1]}</td>
                    {/each}
                        </tr>
                </tbody>
            </table>
            <br/>
            {/each}
            {/if}
        {/each}
        <div class="mt-10 w-full">
            <div class="text-xl">
                Choose states
            </div>
                <div class="flex flex-col">
                    {#each reveals as reveal, i}
                        <div>Reveal #{i+1}</div>
                        <div class="form-control mb-4">
                            {#each reveal as states}
                                <select class="select w-full" bind:value={states}>
                                    {#each getStateTransitions(minDfa) as transitions}
                                        <option {transitions}>{transitions}</option>
                                    {/each}
                                </select>
                            {/each}
                            <button class="btn" on:click={() => {
                                reveals[i] = [...reveal, "0,1"];
                            }}>+</button>
                        </div>
                    {/each}
                    <button class="btn mt-4" on:click={() => reveals = [...reveals, ["0,1"]]}>New Reveal</button>
                </div>
        </div>
        <button class="btn mt-4" on:click={generate}>Generate</button>
    </div>
    {/if}
    </div>
    </div>  
</div>
