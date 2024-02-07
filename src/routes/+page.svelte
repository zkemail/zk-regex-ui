<script lang="js">
	import { genCircomAllstr } from "$lib/gen_circom";
	import { applyMinDfa, regexToDfa } from "$lib/regex.js";

    let regex = "a=(b|c)+ d=e";
    let inputs = ["a=bccccccccc d=e","",""];
    let minDfa = [];
    let reveals = [[]];

    let parsedInputs = [];

    let circom = "";

    function validateRegex(regex) {
        return !!regex
    };

    function validateInput(input, regex) {
        return !input || applyMinDfa(regexToDfa(regex), input).length > 0;
    }

    function test() {
        minDfa = regexToDfa(regex);
        let results = []
        let replaced_inputs = inputs.map(s => s.replaceAll("\n", "\r\n"));
        for (let input of replaced_inputs) {
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
    
    function displayChar(c) {
        if (c === "\r") {
            return "\\r";
        }
        if (c === "\n") {
            return "\\n";
        }
        return c;
    }

    function generate() {
        let r = reveals.map(r1 => r1.map(r2 => r2.split(",")));
        circom = genCircomAllstr(minDfa, "Test", r, regex);
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

    function stateSelected(state, reveals, currentReveal) {
        const reveal = reveals[currentReveal];
        return reveal.includes(state[0] + "," + state[1]);
    }

    function newReveal() {
        reveals = [...reveals, []];
        currentReveal += 1;
    }

</script>

<div class="h-auto w-full text-primary-content mb-16 mt-32">
    <div class="h-auto overflow-y-scroll w-full flex items-center justify-center">
        <div class="w-5/6">
    <form class="w-full">
        <div class="form-control w-full mb-4">
            <label for="regex" class="label" id="regexpattern">
                <span class="label-text">Regex Pattern</span>
            </label>
            <input id="regex" type="text" class:input-error={!validateRegex(regex)} bind:value={regex} placeholder="(h|H)ello (w|W)orld" class="input input-bordered w-full" />
        </div>
        <div class="form-control w-full mb-4">
            <label for="input1" class="label">
                <span class="label-text">Input 1</span>
            </label>
            <textarea id="input1" class:input-error={!validateInput(inputs[0], regex)} bind:value={inputs[0]} placeholder="" class="textarea textarea-bordered w-full" />
        </div>
        <div class="form-control w-full mb-4">
            <label for="input2" class="label">
                <span class="label-text">Input 2</span>
            </label>
            <textarea id="input2" class:input-error={!validateInput(inputs[1], regex)} bind:value={inputs[1]} placeholder="" class="textarea textarea-bordered  w-full" />
        </div>
        <div class="form-control w-full mb-4">
            <label for="input3" class="label">
                <span class="label-text">Input 3</span>
            </label>
            <textarea id="input3" class:input-error={!validateInput(inputs[2], regex)} bind:value={inputs[2]} placeholder="" class="textarea textarea-bordered  w-full" />
        </div>
        <button class="btn mt-2 w-full" on:click|preventDefault={test}>Continue</button>
    </form>
    {#if parsedInputs.length > 0}
    <div class="text-left w-full mt-4">
        Click the states below to select the characters you want to reveal or export.
        <br/>
        <br/>
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
                            <th class="p-0 w-5 cursor-pointer" on:click={() => {selectRevealState(state)}}>{state[1]}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                        <tr class="border-b-stone-300">
                    {#each states as state}
                        <td class="p-0 w-5 cursor-pointer" class:bg-yellow-50={stateSelected(state, reveals, currentReveal)} on:click={() => {selectRevealState(state)}}>{displayChar(state[2])}</td>
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
                Selected Reveal Groups
            </div>
                <div class="flex flex-col">
                    {#each reveals as reveal, i}
                        <div class="flex flex-row items-center">
                            <button class="btn btn-sm btn-circle btn-ghost text-red-500" on:click={() => removeReveal(i)}>✕</button>
                            <div class="mr-4 cursor-pointer" on:click={() => currentReveal = i} class:font-bold={currentReveal === i}>Reveal #{i}</div>
                            <div>{JSON.stringify(reveal)}</div>
                        </div>
                    {/each}
                    <button class="btn mt-4 w-1/3" on:click={newReveal}>+ Add New Reveal Group</button>
                </div>
        </div>
        <button class="btn mt-4 w-full" on:click={generate} onclick="my_modal_2.showModal()">Generate</button>
    </div>
    {/if}
    </div>
    </div> 
        <!-- Open the modal using ID.showModal() method -->
    <dialog id="my_modal_2" class="modal">
    <div class="modal-box prose" style="min-width:800px;">
        <h3 class="font-bold text-lg"></h3>
    <pre>
        <svg class="shrink-0 h-5 w-5 transition text-gray-500 group-hover:text-white absolute right-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" on:click={() => navigator.clipboard.writeText(circom)}>
        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
        <path
            d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z">
        </path>
    </svg>
<code class="text-xs">{circom}</code></pre>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
    </dialog>
</div>
