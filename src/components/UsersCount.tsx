import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users} from 'lucide-react'
import axios from 'axios'


const UsersCount: React.FC = () => {
    const [totalUsers, setTotalUsers] = useState()

    useEffect(()=>{
        const fetch=async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users-count`)
        const total_users = response.data.total_users
        setTotalUsers(total_users)
        }
        fetch()
    }
    ,[])
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-2 text-sm">
            <Users className="w-4 h-4 text-indigo-600 mr-2" />
            <span className="text-gray-600">Growing community of</span>
            <span className="font-bold text-indigo-600 mx-1">{totalUsers}</span>
            <span className="text-gray-600">registered users</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UsersCount
