export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          best_score: number | null
          created_at: string | null
          favorite_theme: string | null
          full_name: string | null
          games_played: number | null
          id: string
          multiplayer_points: number | null
          total_points: number | null
          true_false_points: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          best_score?: number | null
          created_at?: string | null
          favorite_theme?: string | null
          full_name?: string | null
          games_played?: number | null
          id: string
          multiplayer_points?: number | null
          total_points?: number | null
          true_false_points?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          best_score?: number | null
          created_at?: string | null
          favorite_theme?: string | null
          full_name?: string | null
          games_played?: number | null
          id?: string
          multiplayer_points?: number | null
          total_points?: number | null
          true_false_points?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      quiz_history: {
        Row: {
          badge: string | null
          correct_answers: number
          created_at: string | null
          difficulty: string
          id: string
          score: number
          theme: string
          time_spent: number
          total_questions: number
          user_id: string
        }
        Insert: {
          badge?: string | null
          correct_answers: number
          created_at?: string | null
          difficulty: string
          id?: string
          score: number
          theme: string
          time_spent: number
          total_questions: number
          user_id: string
        }
        Update: {
          badge?: string | null
          correct_answers?: number
          created_at?: string | null
          difficulty?: string
          id?: string
          score?: number
          theme?: string
          time_spent?: number
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      quiz_room_answers: {
        Row: {
          answer_index: number
          answered_at: string
          id: string
          is_correct: boolean
          points_earned: number
          question_index: number
          response_time: number
          room_id: string
          user_id: string
        }
        Insert: {
          answer_index: number
          answered_at?: string
          id?: string
          is_correct: boolean
          points_earned?: number
          question_index: number
          response_time: number
          room_id: string
          user_id: string
        }
        Update: {
          answer_index?: number
          answered_at?: string
          id?: string
          is_correct?: boolean
          points_earned?: number
          question_index?: number
          response_time?: number
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_room_answers_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "quiz_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_room_players: {
        Row: {
          answer_time: string | null
          correct_answers: number
          current_answer: number | null
          id: string
          is_ready: boolean
          joined_at: string
          room_id: string
          score: number
          user_id: string
          username: string
        }
        Insert: {
          answer_time?: string | null
          correct_answers?: number
          current_answer?: number | null
          id?: string
          is_ready?: boolean
          joined_at?: string
          room_id: string
          score?: number
          user_id: string
          username: string
        }
        Update: {
          answer_time?: string | null
          correct_answers?: number
          current_answer?: number | null
          id?: string
          is_ready?: boolean
          joined_at?: string
          room_id?: string
          score?: number
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_room_players_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "quiz_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_rooms: {
        Row: {
          created_at: string
          current_question: number | null
          difficulty: string
          finished_at: string | null
          host_id: string
          id: string
          max_players: number
          question_count: number
          questions: Json | null
          room_code: string
          started_at: string | null
          status: string
          theme: string
        }
        Insert: {
          created_at?: string
          current_question?: number | null
          difficulty: string
          finished_at?: string | null
          host_id: string
          id?: string
          max_players?: number
          question_count?: number
          questions?: Json | null
          room_code: string
          started_at?: string | null
          status?: string
          theme: string
        }
        Update: {
          created_at?: string
          current_question?: number | null
          difficulty?: string
          finished_at?: string | null
          host_id?: string
          id?: string
          max_players?: number
          question_count?: number
          questions?: Json | null
          room_code?: string
          started_at?: string | null
          status?: string
          theme?: string
        }
        Relationships: []
      }
      true_false_history: {
        Row: {
          correct_answers: number
          created_at: string
          difficulty: string
          id: string
          theme: string
          time_spent: number
          total_points: number
          total_questions: number
          user_id: string
        }
        Insert: {
          correct_answers: number
          created_at?: string
          difficulty: string
          id?: string
          theme: string
          time_spent: number
          total_points: number
          total_questions: number
          user_id: string
        }
        Update: {
          correct_answers?: number
          created_at?: string
          difficulty?: string
          id?: string
          theme?: string
          time_spent?: number
          total_points?: number
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          description: string | null
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          description?: string | null
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          description?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_inactive_rooms: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_room_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      user_is_in_room: {
        Args: { room_id: string; user_id: string }
        Returns: boolean
      }
      user_is_room_host: {
        Args: { room_id: string; user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
