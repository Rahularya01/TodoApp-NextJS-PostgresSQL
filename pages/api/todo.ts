// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Post Task
  if (req.method === "POST") {
    try {
      const { name, completed } = req.body;
      const task = await prisma.todo.create({
        data: {
          name: name,
          completed: completed,
        },
      });
      res.status(200).json(task);
    } catch (error) {
      res.json(error);
    }
  }
  // Get Task
  if (req.method === "GET") {
    try {
      const tasks = await prisma.todo.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(tasks);
    } catch (error) {
      res.json(error);
    }
  }
  // Update Task
  if (req.method === "PUT") {
    const { id, completed } = req.body;
    try {
      const updatedTask = await prisma.todo.update({
        where: {
          id: id,
        },
        data: {
          completed: completed,
        },
      });
      res.status(200).json(updatedTask);
    } catch (error) {
      res.json({
        message: "Task Doesn't Exist!",
      });
    }
  }
  // Delete Task
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedTask = await prisma.todo.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ message: "Task Deleted Successfully" });
    } catch (error) {
      res.json(error);
    }
  }
}
