import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface AnalyzeRequest {
  type: 'health_query' | 'fitness_activity' | 'daily_goal' | 'health_tip_interaction' | 'symptom_upload' | 'user_session'
  data: any
  userId?: string
  sessionId?: string
}

interface HealthQueryData {
  query: string
  response?: string
  sessionId?: string
}

interface FitnessActivityData {
  activityType: 'steps' | 'calories' | 'cycling' | 'gym' | 'yoga'
  duration?: number
  steps?: number
  calories?: number
  additionalData?: any
}

interface DailyGoalData {
  goalType: string
  goalText: string
  targetValue?: number
  currentValue?: number
  completed?: boolean
}

interface HealthTipInteractionData {
  tipId: string
  tipTitle: string
  interactionType: 'view' | 'like' | 'share' | 'bookmark'
  durationSeconds?: number
}

interface UserSessionData {
  action: string
  pageView?: string
  deviceInfo?: any
  userAgent?: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client with service role key
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { type, data, userId, sessionId }: AnalyzeRequest = await req.json()

    if (!type || !data) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: type and data' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    let result: any = {}

    switch (type) {
      case 'health_query':
        result = await analyzeHealthQuery(supabaseClient, data as HealthQueryData, userId, sessionId)
        break
      
      case 'fitness_activity':
        result = await analyzeFitnessActivity(supabaseClient, data as FitnessActivityData, userId)
        break
      
      case 'daily_goal':
        result = await analyzeDailyGoal(supabaseClient, data as DailyGoalData, userId)
        break
      
      case 'health_tip_interaction':
        result = await analyzeHealthTipInteraction(supabaseClient, data as HealthTipInteractionData, userId)
        break
      
      case 'user_session':
        result = await analyzeUserSession(supabaseClient, data as UserSessionData, userId, sessionId)
        break
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid analysis type' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
    }

    return new Response(
      JSON.stringify({ success: true, result }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in analyze-user-input function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Analyze health queries (AI Doctor chat)
async function analyzeHealthQuery(supabase: any, data: HealthQueryData, userId?: string, sessionId?: string) {
  const { query, response } = data
  
  // Simple sentiment analysis
  const sentimentScore = analyzeSentiment(query)
  
  // Extract keywords
  const keywords = extractKeywords(query)
  
  // Categorize query
  const category = categorizeHealthQuery(query)
  
  // Determine urgency level
  const urgencyLevel = determineUrgency(query)

  // Store in database
  const { data: insertedData, error } = await supabase
    .from('health_queries')
    .insert({
      user_id: userId,
      session_id: sessionId || crypto.randomUUID(),
      user_query: query,
      ai_response: response,
      sentiment_score: sentimentScore,
      query_category: category,
      urgency_level: urgencyLevel,
      keywords: keywords
    })
    .select()

  if (error) {
    console.error('Error inserting health query:', error)
    throw error
  }

  return {
    sentimentScore,
    keywords,
    category,
    urgencyLevel,
    queryId: insertedData[0]?.id
  }
}

// Analyze fitness activities
async function analyzeFitnessActivity(supabase: any, data: FitnessActivityData, userId?: string) {
  const { activityType, duration, steps, calories, additionalData } = data

  const activityData = {
    duration_minutes: duration,
    steps_count: steps,
    calories_burned: calories,
    ...additionalData
  }

  // Store in database
  const { data: insertedData, error } = await supabase
    .from('fitness_activities')
    .insert({
      user_id: userId,
      activity_type: activityType,
      activity_data: activityData,
      duration_minutes: duration,
      calories_burned: calories,
      steps_count: steps
    })
    .select()

  if (error) {
    console.error('Error inserting fitness activity:', error)
    throw error
  }

  // Calculate daily/weekly stats
  const stats = await calculateFitnessStats(supabase, userId, activityType)

  return {
    activityId: insertedData[0]?.id,
    dailyStats: stats.daily,
    weeklyStats: stats.weekly
  }
}

// Analyze daily goals
async function analyzeDailyGoal(supabase: any, data: DailyGoalData, userId?: string) {
  const { goalType, goalText, targetValue, currentValue, completed } = data

  // Upsert daily goal (update if exists, insert if not)
  const { data: insertedData, error } = await supabase
    .from('daily_goals')
    .upsert({
      user_id: userId,
      goal_type: goalType,
      goal_text: goalText,
      target_value: targetValue,
      current_value: currentValue,
      completed: completed,
      completion_date: completed ? new Date().toISOString() : null,
      date: new Date().toISOString().split('T')[0] // Today's date
    }, {
      onConflict: 'user_id,goal_type,date'
    })
    .select()

  if (error) {
    console.error('Error upserting daily goal:', error)
    throw error
  }

  // Update streak if goal completed
  if (completed) {
    await updateGoalStreak(supabase, userId, goalType)
  }

  return {
    goalId: insertedData[0]?.id,
    completed: completed
  }
}

// Analyze health tip interactions
async function analyzeHealthTipInteraction(supabase: any, data: HealthTipInteractionData, userId?: string) {
  const { tipId, tipTitle, interactionType, durationSeconds } = data

  const { data: insertedData, error } = await supabase
    .from('health_tips_interactions')
    .insert({
      user_id: userId,
      tip_id: tipId,
      tip_title: tipTitle,
      interaction_type: interactionType,
      duration_seconds: durationSeconds
    })
    .select()

  if (error) {
    console.error('Error inserting health tip interaction:', error)
    throw error
  }

  return {
    interactionId: insertedData[0]?.id
  }
}

// Analyze user sessions
async function analyzeUserSession(supabase: any, data: UserSessionData, userId?: string, sessionId?: string) {
  const { action, pageView, deviceInfo, userAgent } = data

  // Get or create session
  let session = null
  if (sessionId) {
    const { data: existingSession } = await supabase
      .from('user_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()
    
    session = existingSession
  }

  if (!session) {
    // Create new session
    const { data: newSession, error } = await supabase
      .from('user_sessions')
      .insert({
        user_id: userId,
        device_info: deviceInfo,
        user_agent: userAgent,
        actions_taken: [action]
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user session:', error)
      throw error
    }
    
    session = newSession
  } else {
    // Update existing session
    const updatedActions = [...(session.actions_taken || []), action]
    const { error } = await supabase
      .from('user_sessions')
      .update({
        actions_taken: updatedActions,
        page_views: (session.page_views || 0) + (pageView ? 1 : 0)
      })
      .eq('id', session.id)

    if (error) {
      console.error('Error updating user session:', error)
      throw error
    }
  }

  return {
    sessionId: session.id,
    totalActions: session.actions_taken?.length || 1
  }
}

// Helper functions
function analyzeSentiment(text: string): number {
  const positiveWords = ['good', 'great', 'excellent', 'happy', 'healthy', 'better', 'improved', 'wonderful']
  const negativeWords = ['bad', 'terrible', 'awful', 'sick', 'pain', 'hurt', 'worse', 'problem', 'issue']
  
  const words = text.toLowerCase().split(/\s+/)
  let score = 0
  
  words.forEach(word => {
    if (positiveWords.includes(word)) score += 0.1
    if (negativeWords.includes(word)) score -= 0.1
  })
  
  return Math.max(-1, Math.min(1, score))
}

function extractKeywords(text: string): string[] {
  const healthKeywords = [
    'headache', 'fever', 'cough', 'pain', 'tired', 'fatigue', 'nausea', 'dizzy',
    'exercise', 'workout', 'diet', 'nutrition', 'weight', 'sleep', 'stress',
    'heart', 'blood', 'pressure', 'diabetes', 'cholesterol', 'vitamin'
  ]
  
  const words = text.toLowerCase().split(/\s+/)
  return healthKeywords.filter(keyword => 
    words.some(word => word.includes(keyword) || keyword.includes(word))
  )
}

function categorizeHealthQuery(query: string): string {
  const categories = {
    symptoms: ['pain', 'hurt', 'sick', 'fever', 'cough', 'headache', 'nausea'],
    nutrition: ['diet', 'food', 'eat', 'nutrition', 'vitamin', 'calories'],
    exercise: ['exercise', 'workout', 'fitness', 'gym', 'run', 'walk'],
    mental_health: ['stress', 'anxiety', 'depression', 'sleep', 'tired'],
    general: []
  }
  
  const lowerQuery = query.toLowerCase()
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      return category
    }
  }
  
  return 'general'
}

function determineUrgency(query: string): string {
  const emergencyWords = ['emergency', 'urgent', 'severe', 'chest pain', 'can\'t breathe', 'bleeding']
  const highWords = ['pain', 'fever', 'sick', 'hurt']
  const mediumWords = ['tired', 'headache', 'cough']
  
  const lowerQuery = query.toLowerCase()
  
  if (emergencyWords.some(word => lowerQuery.includes(word))) return 'emergency'
  if (highWords.some(word => lowerQuery.includes(word))) return 'high'
  if (mediumWords.some(word => lowerQuery.includes(word))) return 'medium'
  
  return 'low'
}

async function calculateFitnessStats(supabase: any, userId?: string, activityType?: string) {
  const today = new Date().toISOString().split('T')[0]
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  // Daily stats
  const { data: dailyData } = await supabase
    .from('fitness_activities')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)

  // Weekly stats
  const { data: weeklyData } = await supabase
    .from('fitness_activities')
    .select('*')
    .eq('user_id', userId)
    .gte('date', weekAgo)

  return {
    daily: {
      totalActivities: dailyData?.length || 0,
      totalCalories: dailyData?.reduce((sum, activity) => sum + (activity.calories_burned || 0), 0) || 0,
      totalSteps: dailyData?.reduce((sum, activity) => sum + (activity.steps_count || 0), 0) || 0
    },
    weekly: {
      totalActivities: weeklyData?.length || 0,
      totalCalories: weeklyData?.reduce((sum, activity) => sum + (activity.calories_burned || 0), 0) || 0,
      totalSteps: weeklyData?.reduce((sum, activity) => sum + (activity.steps_count || 0), 0) || 0
    }
  }
}

async function updateGoalStreak(supabase: any, userId?: string, goalType?: string) {
  // Get yesterday's goal completion
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  
  const { data: yesterdayGoal } = await supabase
    .from('daily_goals')
    .select('*')
    .eq('user_id', userId)
    .eq('goal_type', goalType)
    .eq('date', yesterday)
    .single()

  let newStreak = 1
  if (yesterdayGoal?.completed) {
    newStreak = (yesterdayGoal.streak_count || 0) + 1
  }

  // Update today's goal with new streak
  const today = new Date().toISOString().split('T')[0]
  await supabase
    .from('daily_goals')
    .update({ streak_count: newStreak })
    .eq('user_id', userId)
    .eq('goal_type', goalType)
    .eq('date', today)
}