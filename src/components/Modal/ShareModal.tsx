'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Facebook, Instagram, Copy, Twitter } from 'lucide-react';
import { toast } from 'sonner';

interface ShareModalProps {
  url: string;
  title: string;
  children: React.ReactNode;
}

const ShareModal = ({ url, title, children }: ShareModalProps) => {
  const [open, setOpen] = useState(false);
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
  
  const shareOptions = [
    {
      name: 'Facebook',
      icon: <Facebook size={24} />,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, '_blank'),
      color: '#1877F2'
    },
    {
      name: 'Instagram',
      icon: <Instagram size={24} />,
      action: () => {
        toast.info("Open Instagram and share this URL in your story");
        copyToClipboard();
      },
      color: '#C13584'
    },
    {
      name: 'TikTok',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.59 6.69C19.507 6.67 19.423 6.652 19.34 6.635C18.392 6.432 17.526 5.942 16.86 5.23C16.195 4.517 15.761 3.618 15.61 2.655H15.644C15.558 2.447 15.5 2.233 15.5 2H12V14.5C12 15.1 11.76 15.7 11.32 16.12C10.88 16.56 10.28 16.8 9.68 16.8C9.08 16.8 8.48 16.56 8.04 16.12C7.6 15.7 7.36 15.1 7.36 14.5C7.36 13.3 8.32 12.32 9.52 12.32C9.73 12.32 9.93 12.34 10.12 12.39V8.92C9.98 8.901 9.84 8.891 9.7 8.89C8.475 8.887 7.286 9.34 6.36 10.17C5.433 11.001 4.836 12.147 4.685 13.396C4.534 14.645 4.842 15.908 5.553 16.937C6.265 17.967 7.328 18.686 8.546 18.947C9.764 19.209 11.033 18.995 12.09 18.347C13.147 17.699 13.9 16.662 14.198 15.457C14.225 15.356 14.246 15.254 14.267 15.152C14.289 15.051 14.3 14.517 14.3 14.5V8.05C14.833 8.43 15.406 8.738 16.002 8.967C16.599 9.195 17.222 9.341 17.85 9.4V6.8C17.85 6.8 17.85 6.8 17.85 6.8C18.45 6.85 19.04 6.81 19.59 6.68V6.69Z" fill="currentColor"/>
      </svg>,
      action: () => {
        toast.info("Open TikTok and share this URL in your video");
        copyToClipboard();
      },
      color: '#000000'
    },
    {
      name: 'X',
      icon: <Twitter size={24} />,
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`, '_blank'),
      color: '#1DA1F2'
    },
    {
      name: 'Copy Link',
      icon: <Copy size={24} />,
      action: copyToClipboard,
      color: '#6c757d'
    }
  ];

  function copyToClipboard() {
    navigator.clipboard.writeText(fullUrl).then(() => {
      toast.success("URL copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy URL");
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#313130] border border-[#a6a6a6] text-white">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">Share this artwork</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => {
                  option.action();
                  if (option.name !== 'Copy Link') {
                    setOpen(false);
                  }
                }}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-[#414140] transition-colors"
              >
                <div 
                  className="p-3 rounded-full" 
                  style={{ backgroundColor: `${option.color}20` }}
                >
                  {React.cloneElement(option.icon as React.ReactElement, { 
                    color: option.color,
                    size: 24
                  })}
                </div>
                <span className="text-sm">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal; 