import { Container, Title, TopBar, ProductsGroupList, FiltersDrawer, Stories } from "@/shared/components/shared";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categoryes = await findPizzas(searchParams)

  return (
    <>
      <Container className="mt-10">
        <Title size="lg" className="font-extrabold" text='All pizzas' />
      </Container>
      <TopBar categories={categoryes.filter((category) => category.products.length > 0)} />
      <Stories />
      <Container className="mt-10 pb-14">
        <div className='flex flex-col xl:flex-row gap-[60px]'>
          <FiltersDrawer />

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {
                categoryes.map((categoryes) => (
                  categoryes.products.length && (
                    <ProductsGroupList
                      key={categoryes.id}
                      title={categoryes.name}
                      categoryId={categoryes.id}
                      items={categoryes.products}
                    />
                  )
                ))
              }

            </div>


          </div>
        </div>
      </Container>
    </>

  );
}
