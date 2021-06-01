import { useReducer, useEffect, createContext, useState } from "react"
import { gradientsReducer } from '../reducers/gradientsReducer'


// créer et exporter ("named") FilterContext object
export const GradientsContext = createContext()

/* le component-provider qui embrassera la partie de notre app où on utilise ce context */
export const GradientsContextProvider = ({ children }) => {

  const [filter, setFilter] = useState("all")

  const initialState = {
    colors: [],
    loading: false
  }

  const [state, dispatch] = useReducer(gradientsReducer, initialState);

  const { colors, loading } = state

  useEffect(() => {
    dispatch({ type: "FETCH_INIT" });
    fetch(`https://gradients-api.herokuapp.com/gradients`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Nous n'avons pas pu lire le registre des dégradés, status : ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      });
  }, []);


  function allTags(list) {
    /* retourner la liste des tags uniques */
    let listTotal = []
    for (let element of list) {
      if ("tags" in element) {
        listTotal = listTotal.concat(element.tags)
      }
    }
    const listTagsUnique = []
    listTotal.forEach((el) => {
      if (!listTagsUnique.includes(el)) {
        //listTagsUnique = listTagsUnique.concat([el])
        listTagsUnique.push(el)
      }
    })
    return listTagsUnique
  }
  const tags = allTags(colors);
  // console.log(tags)
  console.log(colors)

  return (
    <GradientsContext.Provider value={{ tags, colors, filter, setFilter, loading }}>
      {children}
      {loading && <p className="text-center">loading...</p>}
    </GradientsContext.Provider>
  )
}