export default function Footer(){
    return(
        <footer className="py-4 text-sm text-zinc-500 text-center border-t border-zinc-200 dark:border-zinc-800">
        © {new Date().getFullYear()} ConnectHub. All rights reserved.
      </footer>
    )
}