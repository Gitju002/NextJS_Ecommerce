import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Cloud, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactSelect from "react-select";
import { Textarea } from "@/components/ui/textarea";
import { multiSelectStyles } from "@/utils/colorOptions";
import { useAppDispatch } from "@/store/hooks";
import { addProduct } from "@/store/features/productSlice";
import { fileToBase64 } from "@/utils/convert";

const sizeSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const colorSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const formSchema = z.object({
  picture: z.instanceof(File).nullable(),
  product_name: z.string().min(2).max(50),
  product_category: z.string().nonempty("Category is required"),
  product_sizes: z.array(sizeSchema).min(1, "At least one size is required"),
  product_color: z.array(colorSchema).nonempty("Color is required"),
  product_price: z.string().min(1),
  product_description: z.string().min(10).max(500),
});

const colorOptions = [
  { label: "Red", value: "red", color: "#FF5630" },
  { label: "Blue", value: "blue", color: "#0052CC" },
  { label: "Green", value: "green", color: "#36B37E" },
  { label: "Yellow", value: "yellow", color: "#FFAB00" },
  { label: "Black", value: "black", color: "#253858" },
  { label: "White", value: "white", color: "#FFFFFF" },
  { label: "Purple", value: "purple", color: "#6554C0" },
  { label: "Pink", value: "pink", color: "#FF8B8B" },
];

const sizeOptions = [
  { label: "XS", value: "xs" },
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
  { label: "XXL", value: "xxl" },
];

export default function MyForm() {
  const [mounted, setMounted] = useState(false);
  const fileref = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      product_category: "",
      product_sizes: [],
      product_color: [],
      product_price: "0",
      product_description: "",
      picture: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const pictureBase64 = values.picture
        ? await fileToBase64(values.picture)
        : null;

      const payload = { ...values, picture: pictureBase64 };
      dispatch(addProduct(payload));
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="container py-5 bg-slate-200">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto rounded-lg p-10 bg-white"
        >
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-slate-500">
                  Upload Product Image
                </FormLabel>
                <FormControl>
                  <div
                    className="w-full h-32 rounded-sm border border-dashed flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => fileref.current?.click()}
                  >
                    <Cloud className="size-10 text-slate-500" />
                    <div className="text-slate-400">Upload Image Here</div>
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileref}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                        if (fileref.current) {
                          fileref.current.value = "";
                        }
                      }}
                    />
                  </div>
                </FormControl>
                {form.watch("picture") !== null && (
                  <div className="flex justify-between items-center w-full border rounded-sm p-2 text-slate-500">
                    <p>File Name: {form.watch("picture")?.name}</p>
                    {form.watch("picture")?.size !== undefined && (
                      <p>
                        File Size:{" "}
                        {(form.watch("picture")?.size! / 1024).toFixed(2)} KB
                      </p>
                    )}
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        field.onChange(null);
                        if (fileref.current) {
                          fileref.current.value = "";
                        }
                      }}
                    >
                      <Trash />
                    </Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="product_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-slate-500">
                  Product Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Product name"
                    type="text"
                    className="text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="product_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-slate-500">
                  Categories
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-black">
                      <SelectValue placeholder="Select product product_category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Electronics", "Clothing", "Footwear", "Accessories"].map(
                      (product_category, index) => (
                        <SelectItem key={index} value={product_category}>
                          {product_category}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="product_sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-slate-500">
                      Sizes
                    </FormLabel>
                    <FormControl>
                      <ReactSelect
                        isMulti
                        name={field.name}
                        options={sizeOptions}
                        value={field.value}
                        onChange={(selected) => {
                          field.onChange(selected);
                        }}
                        className="text-black"
                        classNamePrefix="select"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="product_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-slate-500">
                      Colors
                    </FormLabel>
                    <FormControl>
                      <ReactSelect
                        isMulti
                        name={field.name}
                        options={colorOptions}
                        value={field.value} // Bind to the form field
                        onChange={(selected) => {
                          field.onChange(selected);
                        }}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={multiSelectStyles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="product_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-slate-500">Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Product Price"
                    type="text"
                    className="text-black"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="product_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-slate-500">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Product Description"
                    className="resize-none text-black"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mx-auto">
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
