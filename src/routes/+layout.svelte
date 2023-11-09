<script>
    import "../app.css";
</script>
<main>
	<div class="h-screen bg-base-100">
		<!-- header -->
		<div class="w-full h-1/6 text-center text-primary-content pt-5 md:hidden bg-base-200 pl-8 pr-8">
			<h1 class="text-4xl font-extrabold">Zk Regex Generator</h1>
			<p class="text-left">
			</p>
		</div>
		<div class="w-full flex h-5/6 md:h-full">
			<div class="w-4/12 items-center justify-center hidden md:flex bg-base-200">
				<div class="px-8 text-left text-primary-content">
					<!-- <img src="/logo.svg" class="w-16 inline" />	 -->
					<h1 class="text-4xl font-extrabold">ZK Regex Generator</h1>
					<br/>
						<p>
                            Generate Circom & Halo2 (WIP) circuits for regular expressions.
						</p>
					<div tabindex="0" class="collapse collapse-open"> 
						<h2 class="collapse-title text-2xl font-bold pl-0 pr-0" >Step 1: Input regex and some example strings</h2>
						<p class="collapse-content">
                            xxxx
						</p>
					</div>
					<div tabindex="0" class="collapse collapse-open"> 
						<h2 class="collapse-title text-2xl font-bold pl-0 pr-0">Step 2: Select which states to be revealed</h2>
						<p class="collapse-content">
                            xxxx
						</p>
					</div>
					<div tabindex="0" class="collapse collapse-open"> 
                        <h2 class="collapse-title text-2xl font-bold pl-0 pr-0">Step 3: Generate and test the generated code</h2>
                        <div class="collapse-content">
                            <p>
                                xxxx
                            </p>
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