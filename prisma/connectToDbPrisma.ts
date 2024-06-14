import prisma from "./connectToPrisma"


export const connectDBP = async () => {
    try {
        console.log("Connected through prisma")
        await prisma.$connect()
    } catch (error:any) {
        return new Error(error.message)
    }
}