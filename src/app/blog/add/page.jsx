import { addPost, deletePost } from '@/lib/action'
import React from 'react'

const AddPage = () => {
  return (
    <div>
        <form action={addPost}>
            <input type="text" placeholder='title' name='title' />
            <input type="text" placeholder='desc' name='desc' />
            <input type="text" placeholder='slug' name='slug' />
            <input type="text" placeholder='userId' name='userId' />
            <button>Add</button>
        </form>

        <form action={deletePost}>
            <input type="text" placeholder='post ID' name='id' />
            <button>Delete</button>
        </form>
    </div>
  )
}

export default AddPage