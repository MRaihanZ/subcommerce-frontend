import Carousel from "../components/carousel";
import ButtonHomeCatalog from "../components/buttonHomeCatalog";
// import SmallCatalog from "../components/smallCatalog";

export default function Home() {
	return (
		<>
			<Carousel />
			<div role="tablist" className="tabs tabs-lift">
				<ButtonHomeCatalog />
				<section className="grid grid-cols-5 gap-4 justify-items-center tab-content bg-base-100 border-base-300 p-6">
					{/* <SmallCatalog />
					<SmallCatalog />
					<SmallCatalog />
					<SmallCatalog />
					<SmallCatalog />
					<SmallCatalog />
					<SmallCatalog /> */}
					{window.location.hash === "#hot" ? "HOT" : "NOT HOT"}
				</section>
			</div>
			{/* <button className="btn">one-time</button>
			<button className="btn">subscription</button>
			<button className="btn">Hot</button> */}
		</>
	);
}
