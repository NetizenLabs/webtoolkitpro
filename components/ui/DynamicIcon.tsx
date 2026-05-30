import React from 'react'
import {
  Activity, AlertTriangle, AlignLeft, ArrowRightLeft, ArrowUpCircle, BarChart, Barcode, Binary, BookOpen, Bot, Calendar, CaseSensitive, CheckCircle, ChevronRight, ClipboardList, Clock, Code, Code2, Compass, Copy, CreditCard, Database, DollarSign, Eraser, Eye, EyeOff, FileCode, FileJson, FileSearch, FileSignature, FileSpreadsheet, FileText, Fingerprint, FolderTree, GitCompare, Globe, Hash, HelpCircle, Hexagon, Image, Key, Layers, Layout, Link, Link2Off, List, ListOrdered, Lock, Map, MapPin, Maximize, Minimize, Monitor, Network, Palette, Play, QrCode, RefreshCw, Repeat, Ruler, Search, Server, Settings, Share2, Shield, ShieldAlert, ShieldCheck, Smartphone, Smile, Sparkles, Star, Table, Tablet, TrendingUp, Twitter, Type, Undo, UserCheck, UserX, Volume2, Webhook, WifiOff, Zap
} from 'lucide-react'

export const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Activity, AlertTriangle, AlignLeft, ArrowRightLeft, ArrowUpCircle, BarChart, Barcode, Binary, BookOpen, Bot, Calendar, CaseSensitive, CheckCircle, ChevronRight, ClipboardList, Clock, Code, Code2, Compass, Copy, CreditCard, Database, DollarSign, Eraser, Eye, EyeOff, FileCode, FileJson, FileSearch, FileSignature, FileSpreadsheet, FileText, Fingerprint, FolderTree, GitCompare, Globe, Hash, HelpCircle, Hexagon, Image, Key, Layers, Layout, Link, Link2Off, List, ListOrdered, Lock, Map, MapPin, Maximize, Minimize, Monitor, Network, Palette, Play, QrCode, RefreshCw, Repeat, Ruler, Search, Server, Settings, Share2, Shield, ShieldAlert, ShieldCheck, Smartphone, Smile, Sparkles, Star, Table, Tablet, TrendingUp, Twitter, Type, Undo, UserCheck, UserX, Volume2, Webhook, WifiOff, Zap
}

interface DynamicIconProps extends React.ComponentProps<'svg'> {
  name: string
  fallback?: React.ComponentType<any>
  strokeWidth?: number
}

export default function DynamicIcon({ name, fallback = Zap, strokeWidth, ...props }: DynamicIconProps) {
  const IconComponent = ICON_MAP[name] || fallback
  return <IconComponent strokeWidth={strokeWidth} {...props} />
}
