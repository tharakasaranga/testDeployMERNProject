// client/src/components/CrudApp.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'


const API_URL = 'https://ec2-3-83-106-201.compute-1.amazonaws.com:5000/api/items'
//https://testdeploymernprojectbackend-production.up.railway.app

//https://replit.com/@tharakasaranga7/testDeployMERNProjectbackEnd-1?v=1
//https://replit.com/@tharakasaranga7/testDeployMERNProjectbackEnd-1

function CrudApp() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const res = await axios.get(API_URL)
    setItems(res.data)
  }

  const createItem = async () => {
    if (!newItem.trim()) return
    await axios.post(API_URL, { name: newItem })
    setNewItem('')
    fetchItems()
  }

  const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    fetchItems()
  }

  const startEdit = (item) => {
    setEditId(item._id)
    setEditText(item.name)
  }

  const updateItem = async () => {
    if (!editText.trim()) return
    await axios.put(`${API_URL}/${editId}`, { name: editText })
    setEditId(null)
    setEditText('')
    fetchItems()
  }

  return (
    <div>
      <input
        type="text"
        placeholder="New Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={createItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {editId === item._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={updateItem}>Save</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => startEdit(item)}>Edit</button>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CrudApp
