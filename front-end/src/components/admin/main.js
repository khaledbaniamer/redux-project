import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { deleteItem } from "../../redux/itemSlice";


const Main = ()=>{
    const dispatch = useDispatch();
    const allItems = useSelector((state)=>state.item.items);
    const showItems = allItems.map(item=>{
    return(
    <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>
            <Link to={`/update/${item.id}`}  className="btn btn-primary mx-2">Update</Link>
            <Link onClick={()=>dispatch(deleteItem(item.id))} to='/main' className="btn btn-danger mx-2">Delete</Link>
        </td>
    </tr>
    )

    })
    return(
<div className='container m-5'>
    <NavLink to='/add' className="btn btn-secondary my-3">Add</NavLink>
    <table className="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
        {showItems}

        </tbody>
    </table>
</div>
    )
}

export default Main;