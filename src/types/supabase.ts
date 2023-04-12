export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      fin_accounts: {
        Row: {
          balance: number | null
          created_at: string | null
          id: number
          name: string
          owner: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          id?: number
          name: string
          owner?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          id?: number
          name?: string
          owner?: string | null
        }
      }
      fin_records: {
        Row: {
          account_id: number
          amount: number | null
          created_at: string | null
          date_time: string | null
          description: string | null
          id: number
          owner: string
          purpose: string | null
          transaction_type: string | null
        }
        Insert: {
          account_id: number
          amount?: number | null
          created_at?: string | null
          date_time?: string | null
          description?: string | null
          id?: number
          owner: string
          purpose?: string | null
          transaction_type?: string | null
        }
        Update: {
          account_id?: number
          amount?: number | null
          created_at?: string | null
          date_time?: string | null
          description?: string | null
          id?: number
          owner?: string
          purpose?: string | null
          transaction_type?: string | null
        }
      }
      profiles: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_balance: {
        Args: {
          acc_id: number
          amount: number
        }
        Returns: undefined
      }
      increment_balance: {
        Args: {
          acc_id: number
          amount: number
        }
        Returns: undefined
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
