import Items from "@/components/my_components/items";
import FilterSideBar from "@/components/my_components/filterSideBar";

export default function Search() {
	return (
		<>
			<section className="grid grid-cols-12 mt-5">
				<section className="col-span-2 h-fit w-full border rounded-sm shadow-sm">
					<FilterSideBar />
				</section>
				<section className="col-start-3 col-span-10">
					<Items title="Search" />
				</section>
			</section>
		</>
	);
}
