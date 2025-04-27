"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

interface LoginModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
	const [activeTab, setActiveTab] = useState("login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;

			toast("Inicio de sesión exitoso", {
				description: "Has iniciado sesión correctamente.",
			});

			onOpenChange(false);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			toast("Error al iniciar sesión", {
				description: error.message || "Ha ocurrido un error al iniciar sesión.",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						full_name: fullName,
					},
				},
			});

			if (error) throw error;

			// Create profile
			if (data.user) {
				const { error: profileError } = await supabase.from("profiles").insert([
					{
						id: data.user.id,
						email,
						full_name: fullName,
						role: "customer",
					},
				]);

				if (profileError) throw profileError;
			}

			toast("Registro exitoso", {
				description:
					"Te has registrado correctamente. Por favor, verifica tu correo electrónico.",
			});

			onOpenChange(false);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			toast("Error al registrarse", {
				description: error.message || "Ha ocurrido un error al registrarse.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Accede a tu cuenta</DialogTitle>
					<DialogDescription>
						Inicia sesión o regístrate para continuar con tu compra.
					</DialogDescription>
				</DialogHeader>
				<Tabs
					defaultValue="login"
					value={activeTab}
					onValueChange={setActiveTab}
					className="w-full"
				>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="login">Iniciar sesión</TabsTrigger>
						<TabsTrigger value="register">Registrarse</TabsTrigger>
					</TabsList>
					<TabsContent value="login" className="space-y-4 py-4">
						<form onSubmit={handleLogin} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Correo electrónico</Label>
								<Input
									id="email"
									placeholder="tu@email.com"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="password">Contraseña</Label>
									<Button variant="link" className="h-auto p-0 text-xs">
										¿Olvidaste tu contraseña?
									</Button>
								</div>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<Button
								className="w-full bg-rose-500 hover:bg-rose-600"
								type="submit"
								disabled={loading}
							>
								{loading ? "Iniciando sesión..." : "Iniciar sesión"}
							</Button>
						</form>
						<div className="text-center text-sm">
							¿No tienes una cuenta?{" "}
							<Button
								variant="link"
								className="h-auto p-0"
								onClick={() => setActiveTab("register")}
							>
								Regístrate
							</Button>
						</div>
					</TabsContent>
					<TabsContent value="register" className="space-y-4 py-4">
						<form onSubmit={handleRegister} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="register-name">Nombre completo</Label>
								<Input
									id="register-name"
									placeholder="Tu nombre"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="register-email">Correo electrónico</Label>
								<Input
									id="register-email"
									placeholder="tu@email.com"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="register-password">Contraseña</Label>
								<Input
									id="register-password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<Button
								className="w-full bg-rose-500 hover:bg-rose-600"
								type="submit"
								disabled={loading}
							>
								{loading ? "Registrando..." : "Registrarse"}
							</Button>
						</form>
						<div className="text-center text-sm">
							¿Ya tienes una cuenta?{" "}
							<Button
								variant="link"
								className="h-auto p-0"
								onClick={() => setActiveTab("login")}
							>
								Inicia sesión
							</Button>
						</div>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
