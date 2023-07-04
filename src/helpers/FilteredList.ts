
export default function filtredList(
   items: any[],
   searchId: boolean,
   searchQuiry: string,
   by?: string
): any[] {
   return items?.filter(item => {
      let itemBy
      switch (by) {

         case "title":
            itemBy = item.title
            break;

         case "fname":
            itemBy = item.fname
            break;

         case "username":
            itemBy = item.username
            break;



         default:
            itemBy = item.title
            break;
      }


      if (searchId) return searchQuiry === "" ? item : item.id == +searchQuiry

      
      return searchQuiry.toLowerCase() === "" ? item : itemBy.toLowerCase().includes(searchQuiry)

   })
}
