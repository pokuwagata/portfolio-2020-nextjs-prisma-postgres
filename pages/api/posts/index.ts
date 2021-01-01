import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).end("unauthorized");

  if (req.query.uid) {
    if (typeof req.query.uid === "object")
      return res.status(400).end("invalid query parameter");
    if (!Number(req.query.uid))
      return res.status(400).end("invalid query parameter");
  }

  if (req.method === "GET") {
    const where: Prisma.PostWhereInput = {};
    if (req.query.uid) {
      where.userId = Number(req.query.uid as string);
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
    const { id, title, body, userId } = JSON.parse(req.body) as {
      id?: number;
      title: string;
      body: string;
      userId: number;
    };

    if (userId != session.user.id) return res.status(401).end("unauthorized");

    if (id) {
      const updated = await prisma.post.update({
        data: { title, body },
        where: { id },
      });
      res.status(201).json(updated);
    } else {
      const created = await prisma.post.create({
        data: { title, body, User: { connect: { id: userId } } },
      });
      res.status(201).json(created);
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    let where: Prisma.PostWhereInput = {};

    if (typeof id === "object") {
      where.OR = id.map((id) => {
        return { id: Number(id), userId: session.user.id };
      });
    } else {
      where = { id: Number(id), userId: session.user.id };
    }
    const deleted = await prisma.post.deleteMany({
      where,
    });
    res.status(200).json(deleted);
  }
};
