<script>
    import "../app.css";
</script>
<style>
	pre {
			white-space: pre-wrap; /* Allows text to wrap */
			word-wrap: break-word; /* Breaks long words if necessary */
			overflow-wrap: break-word; /* Ensures words break to prevent overflow */
	}
</style>
<main>
	<div class="h-full bg-base-100">
		<!-- header -->
		<div class="w-full text-center text-primary-content pt-5 md:hidden bg-base-200 pl-8 pr-8">
			<h1 class="text-4xl font-extrabold">Visual Circuit Generator</h1>
			<p class="text-left">
			</p>
		</div>
		<div class="w-full flex h-full">
			<div class="w-5/12 hidden md:flex bg-base-200 flex-wrap">
				<div class="px-8 text-left text-primary-content">
					<div class="flex mt-8 flex-wrap">
						<a href="https://zkregex.com" class="flex justify-center items-center hover:underline">
								<img src="/circle-nodes-solid.svg" alt="Circle Nodes" class="w-8 h-8 mr-2">
								<h2 class="text-3xl font-bold">ZK Regex</h2>
						</a>
					</div>
					<!-- <img src="/logo.svg" class="w-16 inline" />	 -->
					<h1 class="text-4xl font-extrabold mt-16">Visual Circuit Generator</h1>
					<br/>
					<p>
						Generate Circom & Halo2 (WIP) circuits for regular expressions.
					</p>
					<div class="collapse collapse-open"> 
						<h2 class="collapse-title text-2xl font-bold pl-0 pr-0" >Step 1: Input regex and some example strings</h2>
						<pre class="collapse-content">
<span>- Linebreaks use:</span><code>/r/n</code>
<span>- View supported syntax </span><a href="https://zkregex.com/min_dfa" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">here</a>
						</pre>
					</div>
					<div class="collapse collapse-open"> 
						<h2 class="collapse-title text-2xl font-bold pl-0 pr-0">Step 2: Select which states to be revealed</h2>
						<pre class="collapse-content">
<span>- Add to each 'Reveal' array by selecting states to reveal
						</pre>
					</div>
					<div class="collapse collapse-open"> 
						<h2 class="collapse-title text-2xl font-bold pl-0 pr-0">Step 3: Generate and test the generated code</h2>
					<div class="collapse-content">
					</div>
					</div>
				</div>
			</div>
			<div class="w-full md:w-8/12">
				<slot />
			</div>
		</div>
	</div>
</main>