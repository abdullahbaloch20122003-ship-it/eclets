import { supabase } from "./supabase";

export async function getProductsFromDatabase() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase products error:", error);
    return [];
  }

  return data;
}

export async function getProductFromDatabase(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Supabase product error:", error);
    return null;
  }

  return data;
}