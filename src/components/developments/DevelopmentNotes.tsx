import React, { useState } from 'react'
import { Card } from '../ui/Card'
import { Send, MessageSquare } from 'lucide-react'
import { INITIAL_NOTES } from '../../data/developmentsData'
import type { NoteItem } from '../../types/developments'

export const DevelopmentNotes: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES)
  const [newNoteContent, setNewNoteContent] = useState('')

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNoteContent.trim()) return

    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      author: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      timestamp: 'Just now',
      content: newNoteContent.trim(),
    }

    setNotes([newNote, ...notes])
    setNewNoteContent('')
  }

  return (
    <div className="space-y-4">
      {/* Add Note Input Card */}
      <Card className="p-4 sm:p-5">
        <h4 className="text-xs sm:text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#C99B30]" />
          <span>Notes</span>
        </h4>
        <p className="text-xs text-slate-500 mb-3">
          Add discussion updates, legal notes, or client feedback regarding this development.
        </p>

        <form onSubmit={handleAddNote}>
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="Add a note..."
            rows={3}
            className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C99B30] resize-none"
          />
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-[11px] text-slate-400">
              Visible to all team members
            </span>
            <button
              type="submit"
              disabled={!newNoteContent.trim()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] disabled:opacity-50 transition-colors shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Add Note</span>
            </button>
          </div>
        </form>
      </Card>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.map((note) => (
          <Card key={note.id} className="p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <img
                  src={note.avatar}
                  alt={note.author}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h5 className="text-xs font-bold text-slate-800">
                    {note.author}
                  </h5>
                  <span className="text-[10px] text-slate-400">
                    {note.timestamp}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pl-9">
              {note.content}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
