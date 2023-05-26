"use client"
import Link from "next/link";
import { useForm } from "react-hook-form"

export default function ExampleForm() {

	const { register, handleSubmit, watch, setValue } = useForm<{ value1: string, value2: string }>({ defaultValues: { value1: "Value 1 Default", value2: " Value 2 Default" } })
	const valueFirst = watch("value1");

	return (
		<form>
			<h2>Example form</h2>
			<div key='input000' className='mt-5'>
				<label htmlFor="textField1">Text Field 1</label>
				<input className="input input-bordered" type="text" {...register('values.textField1')} />
				<p>
					<Link className="text-emerald-500" href="https://youtu.be/gwgmb00G_6g?t=1521">Left off here</Link>
				</p>
			</div>
		</form>

	)
}