<script lang="ts">
	import GoodDataChart from '$lib/GoodDataChart.svelte';

	// Svelte 5: using $state() for reactive state
	interface Product {
		name: string;
		image: string;
		description: string;
	}

	let products = $state<Product[]>([
		{
			name: 'Apples',
			image: '/apples.jpeg',
			description: 'Ideal for baking a delicious pie!'
		},
		{
			name: 'Pears',
			image: '/pears.jpeg',
			description: 'Ideal for smoothies!'
		},
		{
			name: 'Bananas',
			image: '/bananas.jpeg',
			description: 'Get your daily dose of potassium!'
		}
	]);

	let navLinks = $state([
		{ href: '#home', label: 'Home' },
		{ href: '#products', label: 'Products' },
		{ href: '#about', label: 'About' },
		{ href: '#contact', label: 'Contact' }
	]);
</script>

<header class="site-header">
	<h1>My Fruit Store</h1>
	<nav>
		{#each navLinks as link}
			<a href={link.href} class="nav-link">{link.label}</a>
		{/each}
	</nav>
</header>

<main>
	<section class="products">
		<h2>Todays Fruits</h2>
		<div class="product-list">
			{#each products as product}
				<div class="product-item">
					<img src={product.image} alt={product.name} />
					<h3>{product.name}</h3>
					<p>{product.description}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="data-visualization">
		<GoodDataChart />
	</section>
</main>

<footer>
	<div>I am a happy little Footer</div>
</footer>

<style>
	.site-header {
		display: flex;
		flex-direction: row;
		background-color: #333;
		color: white;
		padding: 1em 2em;
		width: 100%;
		box-sizing: border-box;
	}

	.site-header h1 {
		margin: 0;
	}

	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		margin: 0 2em;
	}

	nav .nav-link {
		color: white;
		text-decoration: none;
		margin: 0 1em;
		font-size: 1.1rem;
	}

	nav .nav-link:hover {
		text-decoration: underline;
	}

	.products,
	.data-visualization {
		margin: 1em;
		padding: 1em;
	}

	.products h2 {
		font-size: 1.8rem;
		margin-bottom: 1rem;
	}

	.product-list {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
	}

	.product-item {
		flex: 1;
		min-width: 250px;
		max-width: 350px;
	}

	.product-item img {
		width: 100%;
		height: auto;
		border-radius: 8px;
		object-fit: cover;
	}

	.product-item h3 {
		margin: 0.5rem 0;
		font-size: 1.5rem;
	}

	.product-item p {
		margin: 0;
		font-size: 1.1rem;
	}

	footer {
		background-color: #333;
		color: white;
		text-align: center;
		padding: 1em 0;
		margin-top: auto;
	}

	/* Responsive styles */
	@media (max-width: 899px) {
		.site-header {
			flex-direction: column;
			align-items: center;
		}

		nav {
			margin: 1em 0;
		}

		.nav-link {
			margin: 0.5em;
		}

		.product-list {
			flex-direction: column;
			align-items: center;
		}

		.product-item {
			width: 100%;
			max-width: 400px;
		}
	}

	@media (min-width: 900px) {
		.product-list {
			flex-direction: row;
			justify-content: flex-start;
		}

		.product-item {
			width: 30%;
		}
	}
</style>
