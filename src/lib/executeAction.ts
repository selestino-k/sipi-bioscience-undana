"use server"

import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function executeAction<TInput, TOutput>({
  schema,
  action,
  data,
  revalidate,
}: {
  schema?: z.ZodType<TInput>;
  action: (data: TInput) => Promise<TOutput>;
  data: TInput;
  revalidate?: string[];
}): Promise<ActionResponse<TOutput>> {
  try {
    // Validate input if schema is provided
    const validatedData = schema ? schema.parse(data) : data;
    
    // Execute the action
    const result = await action(validatedData);
    
    // Revalidate any paths if needed
    if (revalidate && revalidate.length > 0) {
      revalidate.forEach(path => revalidatePath(path));
    }
    
    // Return success response
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    // Handle different error types
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error: " + error.errors.map(e => e.message).join(", "),
      };
    }
    
    
    // Return error response
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}