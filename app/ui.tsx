"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodos } from "actions/todo-actions";
import Todo from "components/todo";
import { useState } from "react";

export default function UI() {
  const [searchInput, setSearchInput] = useState("");

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(searchInput),
  });

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: "New Todo",
        completed: false,
      }),

    onSuccess: () => {
      todosQuery.refetch();
    },
  });

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
      <h1 className="text-xl">TODO LIST</h1>

      <Input
        value={searchInput}
        label="Search TODO"
        placeholder="Search TODO"
        icon={<i className="fas fa-search" />}
        onChange={(e) => setSearchInput(e.target.value)}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />

      {todosQuery.isPending && <p>Loading...</p>}
      {todosQuery.data && todosQuery.data.map((todo) => <Todo todo={todo} />)}

      <Button
        onClick={() => createTodoMutation.mutate()}
        loading={createTodoMutation.isPending}
      >
        <i className="fas fa-plus mr-2" />
        ADD TODO
      </Button>
    </div>
  );
}
