import Carousel from "../components/carousel";
import SmallCatalog from "../components/smallCatalog";

export default function Home() {
	return (
		<>
			<Carousel />
			{/* <button className="btn">one-time</button>
			<button className="btn">subscription</button>
			<button className="btn">Hot</button> */}
			<section className="grid grid-cols-5 gap-4 justify-items-center">
				<SmallCatalog />
				<SmallCatalog />
				<SmallCatalog />
				<SmallCatalog />
				<SmallCatalog />
				<SmallCatalog />
				<SmallCatalog />
			</section>
		</>
	);
}
