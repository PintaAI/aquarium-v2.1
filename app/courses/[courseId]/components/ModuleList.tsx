"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useOptimistic } from "react";
import { useToast } from "@/hooks/use-toast";
import { reorderModules } from "@/app/actions/reorder-modules";
import { GripVertical } from "lucide-react";

interface Module {
  id: number;
  title: string;
  description: string;
  jsonDescription: string;
  htmlDescription: string;
  order: number;
  courseId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ModuleListProps {
  modules: Module[];
  courseId: number;
  isAuthor: boolean;
}

export default function ModuleList({
  modules: initialModules,
  courseId,
  isAuthor,
}: ModuleListProps) {
  // Sort modules by order initially
  const sortedModules = [...initialModules].sort((a, b) => a.order - b.order);
  const [modules, setModules] = useOptimistic(sortedModules);
  const { toast } = useToast();

  const onDragEnd = async (result: any) => {
    if (!result.destination || !isAuthor) return;

    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Optimistically update the UI
    setModules(items);

    try {
      const result = await reorderModules(
        courseId,
        items.map((module) => module.id)
      );

      if (!result.success) throw new Error();

      toast({
        title: "Success",
        description: "Module order updated",
      });
    } catch (error) {
      // Revert on error
      setModules(sortedModules);
      toast({
        title: "Error",
        description: "Failed to update module order",
        variant: "destructive",
      });
    }
  };

  if (!modules?.length) {
    return (
      <div className="text-center p-4 border rounded-lg bg-muted/10">
        <p className="text-muted-foreground">No modules yet</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="modules">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {modules.map((module, index) => (
              <Draggable
                key={module.id}
                draggableId={module.id.toString()}
                index={index}
                isDragDisabled={!isAuthor}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={provided.draggableProps.style}
                    className={`${snapshot.isDragging ? "opacity-50" : ""}`}
                  >
                    <Card className="overflow-hidden border-l-4 border-l-primary shadow-sm hover:shadow-md transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-transparent">
                          <div className="flex items-center space-x-3">
                            {isAuthor && (
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-move p-1 hover:bg-primary/10 rounded"
                              >
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                              {index + 1}
                            </span>
                            <h3 className="text-lg font-medium line-clamp-1">
                              {module.title}
                            </h3>
                          </div>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="mt-2 sm:mt-0"
                          >
                            <Link
                              href={`/courses/${courseId}/modules/${module.id}`}
                              className="flex items-center space-x-1"
                            >
                              <span>Start</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-right"
                              >
                                <path d="m9 18 6-6-6-6" />
                              </svg>
                            </Link>
                          </Button>
                        </div>
                        <div className="px-4 pb-4 pt-2">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {module.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
