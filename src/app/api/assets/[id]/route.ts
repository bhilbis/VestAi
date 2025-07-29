import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const id = params.id

  try {
    // Verifikasi apakah aset milik user yang sedang login
    const asset = await prisma.asset.findUnique({
      where: { id },
    })

    if (!asset || asset.userId !== session.user.id) {
      return NextResponse.json({ error: "Aset tidak ditemukan atau bukan milik Anda" }, { status: 403 })
    }

    // Hapus aset
    await prisma.asset.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Gagal menghapus aset:", err)
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 })
  }
}
