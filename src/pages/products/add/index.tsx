import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { colorOptions, multiSelectStyles } from "@/utils/colorOptions";
import { useAppDispatch } from "@/store/hooks";
import { addProduct, resetProductState } from "@/store/features/productSlice";
import { fileToBase64 } from "@/utils/convert";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { sizeOptions } from "@/utils/sizeOptions";
import CustomButton from "@/components/custom-button";

const sizeSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const colorSchema = z.object({
  label: z.string(),
  value: z.string(),
  color: z.string(),
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

export default function MyForm() {
  const [mounted, setMounted] = useState(false);
  const fileref = useRef<HTMLInputElement | null>(null);
  const { success, error, message, isLoading } = useSelector(
    (state: RootState) => state.products
  );
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
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (success) {
      toast.success(message);
      form.reset();
    } else if (error) {
      toast.error(message);
    }
    return () => {
      dispatch(resetProductState());
    };
  }, [success, error, message, form, dispatch]);

  if (!mounted || isLoading) {
    return null;
  }

  return (
    <section className="py-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto rounded-lg p-10 bg-[#3b2a69]/60 border-2 border-blue-200 shadow-md text-white"
        >
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl ">Upload Product Image</FormLabel>
                <FormControl>
                  <div
                    className="w-full h-32 rounded-md bg-slate-300 shadow-sm border border-white/20 border-dashed flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => fileref.current?.click()}
                  >
                    <Cloud className="size-10" />
                    <div className="text-slate-500 text-lg">
                      Upload Image Here
                    </div>
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
                  <div className="flex justify-between items-center w-full border rounded-sm p-2 bg-white shadow-sm ">
                    <p>File Name: {form.watch("picture")?.name}</p>
                    {
                      <p>
                        File Size:{" "}
                        {form.watch("picture")?.size !== undefined
                          ? `${(
                              (form.watch("picture")?.size ?? 0) / 1024
                            ).toFixed(2)} KB`
                          : "Size not available"}
                      </p>
                    }
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
                <FormLabel className="text-xl ">Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Product name"
                    type="text"
                    className="text-black bg-white"
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
                <FormLabel className="text-xl">Categories</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-black bg-white shadow-sm">
                      <SelectValue placeholder="Select product category" />
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
                    <FormLabel className="text-xl">Sizes</FormLabel>
                    <FormControl>
                      <ReactSelect
                        isMulti
                        name={field.name}
                        options={sizeOptions}
                        value={field.value}
                        onChange={(selected) => {
                          field.onChange(selected);
                        }}
                        className="text-black shadow-sm"
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
                    <FormLabel className="text-xl ">Colors</FormLabel>
                    <FormControl>
                      <ReactSelect
                        isMulti
                        name={field.name}
                        options={colorOptions}
                        value={field.value}
                        onChange={(selected) => {
                          field.onChange(selected);
                        }}
                        className="basic-multi-select shadow-sm"
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
                <FormLabel className="text-xl ">Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Product Price"
                    type="text"
                    className="text-black shadow-sm bg-white"
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
                <FormLabel className="text-xl ">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Product Description"
                    className="text-black shadow-sm bg-white"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <CustomButton type="submit" className="mx-auto shadow-md">
              Submit
            </CustomButton>
          </div>
        </form>
      </Form>
    </section>
  );
}
