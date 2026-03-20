"use client";
import { motion } from "framer-motion";
import Introduction from "./Introduction";
import Education from "./Education";

export default function AboutPage() {
    return (
        <div className="px-6 py-10 lg:px-12">
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">About</h1>
            <p className="mt-1 text-sm text-muted-foreground">
                A little bit about me and my educational background.
            </p>

            <div className="my-6 border-t border-dashed border-border" />

            <div className="flex flex-col gap-12">
                <Introduction />
                <Education />
            </div>
        </div>
    );
}