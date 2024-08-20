"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import useUserStore from '@/store/useUserStore'
import { User2Icon } from 'lucide-react'
import { Button } from '../ui/button'

type UserRole = "admin" | "department" | "central" | "director";
interface userTypes {
    firstName: string;
    lastName: string;
    email: string;
    departmentName?: string;
    role: UserRole;
}

const UserProfile = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const { user, setUser, setIsAdmin } = useUserStore()
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status == "authenticated" && session !== null) {
            const formattedUser: userTypes = {
                firstName: session.user?.firstName!,
                lastName: session.user?.lastName!,
                email: session.user?.email!,
                departmentName: session.user?.departmentName!,
                role: session.user?.role! as UserRole,
            }
            setUser(formattedUser)
            setIsAdmin(session?.user?.uid === process.env.NEXT_PUBLIC_ADMIN_UID && session.user?.role === "admin")
        } else if (status === "unauthenticated") {
            router.push('/')
        }
    }, [session, status, router, setUser, setIsAdmin])

    return (
        <Button variant={"ghost"} size={isCollapsed ? "icon" : "default"} className="w-full py-6">
            <div className='p-2 rounded-full'>
                <User2Icon size={25} />
            </div>

            {!isCollapsed && <div className="flex_center flex-col w-full">
                {status == "loading" ?
                    <>
                        <h2 className="text-[0.95em]">Loading...</h2>
                        <span className='opacity-80 text-[0.6em] tracking-wider'>Loading...</span>
                    </>
                    :
                    <>
                        <h2 className="text-[0.95em]">{user?.firstName}</h2>
                        <span className='opacity-80 text-[0.8em] tracking-wider'>{user?.email}</span>
                    </>
                }
            </div>}
        </Button>
    )
}


export default UserProfile