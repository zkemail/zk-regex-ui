<script lang="js">
	import { genCircomAllstr } from "$lib/gen_circom";
	import { applyMinDfa, getStateTransitions, regexToDfa } from "$lib/regex.js";
	import { stringify } from "postcss";

    let regex = "a=(b|c)+ d=e";
    let inputs = ["a=bccccccccc d=e","",""];
    let minDfa = [];
    let reveals = [[]];

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
        let circom = genCircomAllstr(minDfa, "Test", r);
        console.log(circom);
    }

    let currentReveal = 0;
    function selectRevealState(state) {
        const reveal = reveals[currentReveal];
        const transition = state[0] + "," + state[1];
        if (reveal.includes(transition)) {
            reveal.splice(reveal.indexOf(transition), 1);
        } else {
            reveal.push(transition);
        }
        reveal.sort((a,b) => {

        })
        reveals[currentReveal] = reveal;
    }

    function removeReveal(i) {
        if (reveals.length == 1) {
            reveals = [[]];
            currentReveal = 0;
            return;
        }
        reveals.splice(i, 1);
        reveals = reveals;
        currentReveal = reveals.length - 1;
    }

    function stateSelected(state, reveals) {
        const reveal = reveals[currentReveal];
        return reveal.includes(state[0] + "," + state[1]);
    }

    function newReveal() {
        reveals = [...reveals, []];
        currentReveal += 1;
    }

</script>

<div class="h-screen w-full ">
    <div class="h-full overflow-y-scroll w-full flex items-center justify-center">
        <div class="w-5/6">
    <form class="w-full">
        <div class="form-control w-full mb-4">
            <label for="regex" class="label">
                <span class="label-text">Regex Pattern</span>
            </label>
            <input id="regex" type="text" class:input-error={!validateRegex()} bind:value={regex} placeholder="(h|H)ello (w|W)orld" class="input input-bordered w-full" />
        </div>
        <div class="form-control w-full mb-4">
            <label for="input1" class="label">
                <span class="label-text">Input 1</span>
            </label>
            <textarea id="input1" bind:value={inputs[0]} placeholder="" class="textarea textarea-bordered w-full" />
        </div>
        <div class="form-control w-full mb-4">
            <label for="input2" class="label">
                <span class="label-text">Input 2</span>
            </label>
            <textarea id="input2" bind:value={inputs[1]} placeholder="" class="textarea textarea-bordered  w-full" />
        </div>
        <div class="form-control w-full mb-4">
            <label for="input3" class="label">
                <span class="label-text">Input 3</span>
            </label>
            <textarea id="input3" bind:value={inputs[2]} placeholder="" class="textarea textarea-bordered  w-full" />
        </div>
        <button class="btn mt-2 w-full" on:click={test}>Test</button>
    </form>
    {#if parsedInputs.length > 0}
    <div class="text-left w-full mt-4">
        {#each parsedInputs as parsedInput, i}
            {#if parsedInput.length > 0}
            <div class="text-lg mb-2">
                Input {i+1}: {parsedInput.length > 0 ? "Accepted" : "Rejected"} 
            </div>
            {#each parsedInput as states}
            <table class="table text-center w-full">
                <!-- head -->
                <thead>
                    <tr class="border-b-stone-300">
                        {#each states as state}
                            <th class="p-0 w-5" on:click={() => {selectRevealState(state)}}>{state[1]}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                        <tr class="border-b-stone-300">
                    {#each states as state}
                        <td class="p-0 w-5" class:bg-yellow-50={stateSelected(state, reveals)} on:click={() => {selectRevealState(state)}}>{state[2]}</td>
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
                Choose states (Select the characters that you want to reveal from above)
            </div>
                <div class="flex flex-col">
                    {#each reveals as reveal, i}
                        <div class="flex flex-row items-center">
                            <button class="btn btn-sm btn-circle btn-ghost text-red-500" on:click={() => removeReveal(i)}>✕</button>
                            <div class="mr-4">Reveal #{i}</div>
                            <div>{JSON.stringify(reveal)}</div>
                        </div>
                    {/each}
                    <button class="btn mt-4" on:click={newReveal}>New Reveal</button>
                </div>
        </div>
        <button class="btn mt-4 w-full" on:click={generate}>Generate</button>
    </div>
    {/if}
    </div>
    </div>  
</div>
