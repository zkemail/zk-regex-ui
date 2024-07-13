<script>
	import '../app.css';
	let theme = 'dark';

	const toggleTheme = () => {
		if (theme === 'dark') {
			return (theme = 'light');
		}
		return (theme = 'dark');
	};
</script>

<main>
	<div data-theme={theme} class="h-screen bg-base-100">
		<!-- header -->
		<div class="w-full text-center text-primary-content pt-5 md:hidden bg-base-200 pl-8 pr-8">
			<h1 class="text-4xl font-extrabold">Visual Circuit Generator</h1>
			<p class="text-left" />
		</div>
		<div class="w-full flex h-full">
			<div class="w-5/12 hidden md:flex bg-base-200 flex-wrap">
				<div class="px-8 text-left text-primary-content">
					<div class="flex mt-8 flex-wrap">
						<a href="https://zkregex.com" class="flex justify-center items-center hover:underline">
							<img
								src={`${
									theme == 'dark'
										? '/circle-nodes-solid-light.svg'
										: '/circle-nodes-solid-dark.svg'
								}`}
								style="fill: red;"
								alt="Circle Nodes"
								class="w-8 h-8 mr-2"
							/>
							<h2 class="text-3xl font-bold">ZK Regex</h2>
						</a>
					</div>
					<!-- <img src="/logo.svg" class="w-16 inline" />	 -->
					<h1 class="text-4xl font-extrabold mt-16">Visual Circuit Generator</h1>
					<br />
					<p>Generate Circom & Halo2 (WIP) circuits for regular expressions.</p>
					<div class="collapse collapse-open">
						<h2 class="collapse-title text-2xl font-bold pl-0 pr-0">
							Step 1: Input regex and some example strings
						</h2>
						<pre class="collapse-content">
<span>- Linebreaks use:</span><code>/r/n</code>
<span>- View supported syntax </span><a
								href="https://zkregex.com/min_dfa"
								target="_blank"
								rel="noopener noreferrer"
								class="text-blue-500 hover:underline">here</a
							>
						</pre>
					</div>
					<div class="collapse collapse-open">
						<h2 class="collapse-title text-2xl font-bold pl-0 pr-0">
							Step 2: Select which states to be revealed
						</h2>
						<pre class="collapse-content">
<span
								>- Add to each 'Reveal' array by selecting states to reveal
						</span></pre>
					</div>
					<div class="collapse collapse-open">
						<h2 class="collapse-title text-2xl font-bold pl-0 pr-0">
							Step 3: Generate and test the generated code
						</h2>
						<div class="collapse-content" />
					</div>
				</div>
			</div>
			<div class="w-full md:w-8/12 h-100 overflow-scroll">
				<label class="swap swap-rotate float-right pt-8 pr-8">
					<input type="checkbox" on:change={toggleTheme} class="theme-controller" value="night" />
					<svg
						class="swap-off fill-current w-10 h-10"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						><path
							d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
						/></svg
					>
					<svg
						class="swap-on fill-current w-10 h-10"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						><path
							d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
						/></svg
					>
				</label>
				<slot />
			</div>
		</div>
	</div>
</main>

<style>
	pre {
		white-space: pre-wrap; /* Allows text to wrap */
		word-wrap: break-word; /* Breaks long words if necessary */
		overflow-wrap: break-word; /* Ensures words break to prevent overflow */
	}
</style>
